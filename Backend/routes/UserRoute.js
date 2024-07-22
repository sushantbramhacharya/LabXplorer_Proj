import { Router } from "express";
import { pool } from "../config/db.js";

const router=Router();

router.get('/login',async(req,res)=>{
  const result=await pool.query("SELECT * FROM Users;");
  if(result)
  {
    res.send("<h1>Connected and Fetched Successfully</h1>")  
  }
  else{

    res.send("<h1>Hello</h1>")  
  }
})

export default router;