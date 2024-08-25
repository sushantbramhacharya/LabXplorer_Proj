import { pool } from "../config/db.js";
// Update quiz
const updateQuiz = async (question) => {
  try {
    const { id, title, capsule_id } = question;
    await pool.query(
      'UPDATE quizzes SET title = $1, capsule_id = $2 WHERE id = $3',
      [title, capsule_id, id]
    );
  } catch (err) {
    console.error('Error updating quiz', err);
    throw err;
  }
};

// Create quiz
const createQuiz = async (question, capsule_id) => {
  try {
    const { title } = question;
    const result = await pool.query(
      'INSERT INTO quizzes (title, capsule_id) VALUES ($1, $2) RETURNING id',
      [title, capsule_id]
    );
    return { id: result.rows[0].id };
  } catch (err) {
    console.error('Error creating quiz', err);
    throw err;
  }
};

// Delete quiz
const deleteQuiz = async (id) => {
  try {
    await pool.query('DELETE FROM quizzes WHERE id = $1', [id]);
  } catch (err) {
    console.error('Error deleting quiz', err);
    throw err;
  }
};

// Update options
const updateOptions = async (quizId, options) => {
  try {
    const existingOptions = await getOptionsById(quizId);
    const existingOptionsMap = new Map(existingOptions.map(opt => [opt.id, opt]));

    // Determine which options to update, insert, or delete
    const optionsToUpdate = [];
    const optionsToInsert = [];
    const optionsToDelete = [];

    for (const option of options) {
      if (option.id) {
        // Option exists in the database
        const existingOption = existingOptionsMap.get(option.id);

        if (existingOption) {
          optionsToUpdate.push(option);
          existingOptionsMap.delete(option.id);
        }
      } else {
        optionsToInsert.push(option); // New option
      }
    }

    optionsToDelete.push(...existingOptionsMap.keys());

    // Perform updates
    for (const option of optionsToUpdate) {
      await pool.query(
        'UPDATE options SET option_text = $1, is_correct = $2 WHERE id = $3',
        [option.option_text, option.is_correct, option.id]
      );
    }

    // Perform inserts
    for (const option of optionsToInsert) {
      await pool.query(
        'INSERT INTO options (quiz_id, option_text, is_correct) VALUES ($1, $2, $3)',
        [quizId, option.option_text, option.is_correct]
      );
    }

    // Perform deletions
    for (const optionId of optionsToDelete) {
      await pool.query('DELETE FROM options WHERE id = $1', [optionId]);
    }
  } catch (err) {
    console.error('Error updating options', err);
    throw err;
  }
};

// Create options
const createOptions = async (quizId, options) => {
  try {
    for (const option of options) {
      await pool.query(
        'INSERT INTO options (quiz_id, option_text, is_correct) VALUES ($1, $2, $3)',
        [quizId, option.option_text, option.is_correct]
      );
    }
  } catch (err) {
    console.error('Error creating options', err);
    throw err;
  }
};

// Delete options
const deleteOptions = async (quizId) => {
  try {
    await pool.query('DELETE FROM options WHERE quiz_id = $1', [quizId]);
  } catch (err) {
    console.error('Error deleting options', err);
    throw err;
  }
};

// Get options by quiz ID
const getOptionsById = async (quizId) => {
  try {
    const result = await pool.query('SELECT * FROM options WHERE quiz_id = $1', [quizId]);
    return result.rows;
  } catch (err) {
    console.error('Error fetching options by quiz ID', err);
    return [];
  }
};

export {
  updateQuiz,
  createQuiz,
  deleteQuiz,
  updateOptions,
  createOptions,
  deleteOptions
};