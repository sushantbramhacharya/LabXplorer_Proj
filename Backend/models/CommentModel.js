import { pool } from "../config/db.js";

//Get Comments By Capsule ID
export const getCommentsByCapsuleId = async (capsuleID) => {
    try {
      const result = await pool.query(
        "SELECT * FROM comments WHERE capsule_id = $1",
        [capsuleID]
      );
      return result.rows; // Return all comments for the specific capsule
    } catch (err) {
      console.error("Fetching Comments by Capsule ID \n", err);
      return undefined;
    }
  };
  
//Get Comments By User Id
export const getCommentsByUserId = async (userID) => {
    try {
      const result = await pool.query(
        "SELECT * FROM comments WHERE user_id = $1",
        [userID]
      );
      return result.rows; // Return all comments made by the user
    } catch (err) {
      console.error("Fetching Comments by User ID \n", err);
      return undefined;
    }
  };
  

//Insert Comment
export const insertComment = async (capsuleID, userID, commentText) => {
  try {
    const result = await pool.query(
      "INSERT INTO comments (capsule_id, user_id, comment_text) VALUES ($1, $2, $3) RETURNING *",
      [capsuleID, userID, commentText]
    );
    return result.rows[0]; // Return the inserted comment
  } catch (err) {
    console.error("Inserting Comment \n", err);
    return undefined;
  }
};

//Delete Comment
export const deleteComment = async (commentID) => {
  try {
    const result = await pool.query(
      "DELETE FROM comments WHERE comment_id = $1 RETURNING *",
      [commentID]
    );
    return result.rows[0]; // Return the deleted comment, if you want to confirm it was deleted
  } catch (err) {
    console.error("Deleting Comment \n", err);
    return undefined;
  }
};
