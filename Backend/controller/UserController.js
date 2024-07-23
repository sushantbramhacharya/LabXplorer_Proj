import { addUser, getUserByUsername } from "../models/UserModel.js";
import { hashPassword, verifyPassword } from "../utils/PasswordHashing.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { generateToken } from "../utils/GenerateToken.js";

export const loginUser=asyncHandler(async (req,res)=>{
    const data=await req.body;
    const user= await getUserByUsername(data.username);
    
    if(!user)
    {
        res.json({"Error":"No User found"});
    }
    else{
        const verification=await verifyPassword(data.password,user.password)
        if(verification){
            generateToken(res,user.id)
            res.json({
                id:user.id,
                username:user.username,
                email:user.email
              });
        }
        else{
            res.json({
                "Error":"Incorrect Password"
              });
        }
    }
})

export const registerUser=asyncHandler(async (req,res)=>{
    const user= await addUser("sad","ads","sadasd");
    if(user)
    {
        const hashedPassword=await hashPassword("test")
        res.json({"Success":"User Created","Hashed":hashedPassword});
    }
    else{
        res.json({"Error":"Error Occuers"});
    }
})

export const getProfile=asyncHandler(async(req,res)=>{
    res.json({"sucess":true})
})