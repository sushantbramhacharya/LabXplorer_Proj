import { Router } from "express";
import { pool } from "../config/db.js";
import { getProfile, loginUser, registerUser } from "../controller/UserController.js";
import { userOnly } from "../middleware/authMiddleware.js";

const router=Router();

router.post('/login',(req,res)=>loginUser(req,res));
router.post('/register',(req,res)=>registerUser(req,res));
router.route('/profile').get(userOnly,getProfile);

export default router;