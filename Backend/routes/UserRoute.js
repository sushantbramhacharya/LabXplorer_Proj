import { Router } from "express";
import { pool } from "../config/db.js";
import { loginUser, registerUser } from "../controller/UserController.js";

const router=Router();

router.post('/login',(req,res)=>loginUser(req,res));
router.post('/register',(req,res)=>registerUser(req,res));

export default router;