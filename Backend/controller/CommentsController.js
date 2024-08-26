import asyncHandler from "../middleware/asyncHandler.js";
import {
    deleteComment,
  getCommentsByCapsuleId,
  getCommentsByUserId,
  insertComment,
} from "../models/CommentModel.js";

export const commentsByCapId = asyncHandler(async (req, res, next) => {
  const { capsuleId } = req.query;
  const comments = await getCommentsByCapsuleId(capsuleId);
  if (comments.length > 0) {
    res.json(comments);
  } else {
    throw new Error("Could'nt Fetch Comments Check server log for details");
  }
});

export const commentsByUserId = asyncHandler(async (req, res, next) => {
  const { userId } = req.query;
  const comments = await getCommentsByUserId(userId);

  if (comments.length > 0) {
    res.json(comments);
  } else {
    throw new Error(
      "Couldn't fetch comments by User ID. Check server log for details."
    );
  }
});

export const deleteCommentById = asyncHandler(async (req, res, next) => {
  const { commentId } = req.body;
  const result = await deleteComment(commentId);

  if (result) {
    res.json({ message: "Comment successfully deleted." });
  } else {
    throw new Error("Couldn't delete comment. Check server log for details.");
  }
});

export const setComments = asyncHandler(async (req, res, next) => {
  const { capsuleId, comment, authorId } = req.body;
  const result = await insertComment(capsuleId, authorId, comment);
  if (result) {
    res.json("Sucessfully Inserted");
  } else {
    throw new Error(
      "Could'nt Inseting Comments Comments Check server log for details"
    );
  }
});
