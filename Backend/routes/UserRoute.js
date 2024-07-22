import { Router } from "express";

const router=Router();

router.get('/login',(req,res)=>{
  res.send("<h1>Hello</h1>")  
})

export default router;