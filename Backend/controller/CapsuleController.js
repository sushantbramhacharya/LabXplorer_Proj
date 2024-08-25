import asyncHandler from "../middleware/asyncHandler.js";
import {
  deleteCapsuleById,
  getOptionsById,
  readAllCapsules,
  readCapsuleById,
  readCapsulesByCategoryWithLimit,
  readQuizById,
  updateCapsuleById,
} from "../models/CapsuleModel.js";
import {   
  updateQuiz, 
  createQuiz, 
  deleteQuiz, 
  updateOptions, 
  createOptions, 
  deleteOptions 
} from '../models/QuizModel.js';
import { capitalizeFirstLetter } from "../utils/SomeUitls.js";

export const getAllCapsules = asyncHandler(async (req, res, next) => {
  const capsules = await readAllCapsules();
  if (capsules[0]?.id) {
    res.json(capsules);
  } else {
    throw new Error(
      "Some Error Happened in retriving Capsules check server log for details"
    );
  }
})
export const getCapsulesByCategory = asyncHandler(async (req, res, next) => {
  const { category } = req.query;
  const cat = capitalizeFirstLetter(category);

  const capsules = await readCapsulesByCategoryWithLimit(cat, 5);
  if (capsules[0]?.id) {
    res.json(capsules);
  } else {
    throw new Error(
      "Some Error Happened in retriving Capsules check server log for details"
    );
  }
});

export const getCapsulesById = asyncHandler(async (req, res, next) => {
  const { capsuleId } = req.query;
  const capsule = await readCapsuleById(capsuleId);
  if (capsule?.id) {
    const quizes=await readQuizById(capsule.id);
    let hasQuiz;
    if(quizes.length>0)
    {
      hasQuiz=true
    }
    res.json({...capsule,hasQuiz});
  } else {
    throw new Error(
      "Some Error Happened while retriving Capsule check Server log for details"
    );
  }
});

//Admin Only
export const deleteCapsule = asyncHandler(async (req, res, next) => {
  const { capsuleId } = req.body;
  const result = await deleteCapsuleById(capsuleId);
  if (result !== undefined) {
    res.json({ Success: "Successfully Deleted" });
  } else {
    throw new Error("Error Occured Deleting Check Server logs");
  }
});

//edit
export const editCapsule = asyncHandler(async (req, res, next) => {
  const { id:capsuleId } = req.body;
  const updates={...req.body} // Exclude capsuleId from updates

  try {
    // Ensure that the updates object has proper values
    if (!capsuleId || !Object.keys(updates).length) {
      throw new Error('No capsuleId or update data provided');
    }

    const result = await updateCapsuleById(capsuleId, updates);

    if (result) {
      res.json({ success: "Successfully updated" });
    } else {
      throw new Error("Cannot update capsule");
    }
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
});

// quizes

export const getQuizByCapsuleId = asyncHandler(async (req, res, next) => {
  const { id } = req.query; // Extract the capsule ID from query parameters

  const quizzes = await readQuizById(id);
  if (quizzes.length > 0) {
    const result = await Promise.all(
        quizzes.map(async (quiz) => {
          const options = await getOptionsById(quiz.id);
          return { ...quiz, options };
        }))
    if (result.length > 0) {
      res.status(200).json(result);
    }
  } else {
    throw new Error(
      "Error Occured Getting Quiz from Capsule Check Server logs"
    );
  }
});

//update Quiz
export const updateQuizzes = asyncHandler(async (req, res) => {
  const { capsuleId, questions } = req.body; // Extract capsuleId and questions from request body

  try {
    // Fetch existing quizzes and options from the database
    const existingQuizzes = await readQuizById(capsuleId);
    const existingQuizMap = new Map(existingQuizzes.map(q => [q.id, q]));

    // Determine which quizzes to update, insert, or delete
    const quizzesToUpdate = [];
    const quizzesToInsert = [];
    const quizzesToDelete = [];

    // Determine quizzes to update and insert
    for (const incomingQuestion of questions || []) {
      if (incomingQuestion.id) {
        // Question exists in the database
        const existingQuestion = existingQuizMap.get(incomingQuestion.id);

        if (existingQuestion) {
          quizzesToUpdate.push(incomingQuestion);
          existingQuizMap.delete(incomingQuestion.id); // Mark for deletion if not present in incoming data
        }
      } else {
        quizzesToInsert.push(incomingQuestion); // New question
      }
    }

    // Remaining questions in the map are to be deleted
    quizzesToDelete.push(...existingQuizMap.keys());

    // Perform updates
    for (const question of quizzesToUpdate) {
      await updateQuiz(question);
      await updateOptions(question.id, question.options);
    }

    // Perform inserts
    for (const question of quizzesToInsert) {
      const createdQuestion = await createQuiz(question,capsuleId);
      await createOptions(createdQuestion.id, question.options);
    }

    // Perform deletions
    for (const questionId of quizzesToDelete) {
      await deleteQuiz(questionId);
      await deleteOptions(questionId);
    }

    res.status(200).json({ message: 'Quiz data updated successfully' });
  } catch (error) {
    console.error('Failed to update quiz data:', error);
    res.status(500).json({ error: 'Failed to update quiz data' });
  }
});