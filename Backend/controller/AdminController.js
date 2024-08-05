import { pool } from "../config/db.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { insertCapsule } from "../models/CapsuleModel.js";

export const addCapsule = asyncHandler(async (req, res, next) => {
  const { title, description, content, category } = req.body;
  const thumbnail = req.files['thumbnail'] ? req.files['thumbnail'][0].path : '';
  const images = req.files['images'] ? req.files['images'].map(file => file.path) : [];

  try {
    const result = await insertCapsule(title, description, content, category, thumbnail, images);
    if (result) {
      res.json({ success: "Successfully added" });
    } else {
      throw new Error("Cannot add capsule");
    }
  } catch (error) {
    next(error);
  }
});
