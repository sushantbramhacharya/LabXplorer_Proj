import { Router } from 'express';
import { getProfile, loginUser, logoutUser, registerUser, verifyEmail } from '../controller/UserController.js';
import { userOnly } from '../middleware/authMiddleware.js';
import { commentsByUserId } from '../controller/CommentsController.js';
import { addFavourite, removeFavourite, getUserFavourites,isCapsuleUserFavourite } from '../controller/FavouriteController.js';

const router = Router();

// User Routes
router.post('/login', (req, res, next) => loginUser(req, res, next));
router.post('/register', (req, res, next) => registerUser(req, res, next));
router.route('/profile').get(userOnly, getProfile);
router.route('/logout').get(userOnly, logoutUser);

// Comments Routes
router.route('/comment').get(commentsByUserId);

// Verification Route
router.route('/verify').get(verifyEmail);

// Favourites Routes
router.route('/favourites/add').post(userOnly,addFavourite)
router.delete('/favourites/remove', userOnly, (req, res, next) => removeFavourite(req, res, next));
router.get('/favourites/:user_id', (req, res, next) => getUserFavourites(req, res, next));
router.get('/favourites/cap/:capsule_id',userOnly, (req, res, next) => isCapsuleUserFavourite(req, res, next));

export default router;
