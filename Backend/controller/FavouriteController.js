import asyncHandler from '../middleware/asyncHandler.js';
import * as favouriteModel from '../models/FavouriteModel.js';

// Add a new favourite
export const addFavourite = asyncHandler(async (req, res) => {
    const user_id=req.user.id
  const { capsule_id } = req.body;
  try {
    const favourite = await favouriteModel.addFavourite(user_id, capsule_id);
    res.status(201).json(favourite);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Remove a favourite
export const removeFavourite = asyncHandler(async (req, res) => {
  const { capsule_id } = req.body;
  const user_id=req.user.id;
  try {
    const success = await favouriteModel.removeFavourite(user_id, capsule_id);
    if (success) {
      res.status(200).json({ message: 'Favourite removed successfully' });
    } else {
      res.status(404).json({ message: 'Favourite not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all favourites for a user
export const getUserFavourites = asyncHandler(async (req, res) => {
  const { user_id } = req.params;
  try {
    const favourites = await favouriteModel.getUserFavourites(user_id);
    res.status(200).json(favourites);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export const isCapsuleUserFavourite=asyncHandler(async(req,res,next)=>{
    const user_id=req.user.id
    const { capsule_id } = req.params;
    try {
      const favourite = await favouriteModel.getCapsuleFavouriteInfo(user_id, capsule_id);
      res.status(201).json({favourite});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });