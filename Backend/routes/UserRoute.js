import { Router } from "express";
import { pool } from "../config/db.js";
import { loginUser, registerUser } from "../controller/UserController.js";

const router=Router();

router.get('/login',(req,res)=>loginUser(req,res));
router.get('/register',(req,res)=>registerUser(req,res));

export default router;