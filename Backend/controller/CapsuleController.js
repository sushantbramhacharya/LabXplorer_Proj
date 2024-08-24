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
  const result = await deleteCapsuleById(id);
  if (result !== undefined) {
    res.json({ Success: "Successfully Deleted" });
  } else {
    throw new Error("Error Occured Deleting Check Server logs");
  }
});

export const editCapsule = asyncHandler(async (req, res, next) => {
  const { capsuleId, column, updatedData } = req.body;
  const result = await updateCapsuleById(capsuleId, column, updatedData);
  if (result !== undefined) {
    res.json({ Success: "Successfully Deleted" });
  } else {
    throw new Error("Error Occured Editing Capsule Check Server logs");
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


