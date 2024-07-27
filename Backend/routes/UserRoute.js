import { Router } from "express";
import { pool } from "../config/db.js";
import { getProfile, loginUser, logoutUser, registerUser } from "../controller/UserController.js";
import { userOnly } from "../middleware/authMiddleware.js";

const router=Router();

router.post('/login',(req,res,next)=>loginUser(req,res,next));
router.post('/register',(req,res)=>registerUser(req,res,next));
router.route('/profile').get(userOnly,getProfile);
router.route('/logout').get(userOnly,logoutUser)
export default router;