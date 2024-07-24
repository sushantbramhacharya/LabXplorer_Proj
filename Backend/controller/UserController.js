import { addUser, getUserByUsername } from "../models/UserModel.js";
import { hashPassword, verifyPassword } from "../utils/PasswordHashing.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { PRODUCTION } from "../constants.js";
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
            res.status(401)
            throw new Error("Incorrect Credentials")
        }
    }
})

export const registerUser=asyncHandler(async (req,res)=>{
    const data=req.body;
    const hashedPassword=await hashPassword(data.password)
    const user_created= await addUser(data.username,data.email,hashedPassword);
    if(user_created)
    {
        const user=await getUserByUsername(data.username);
        generateToken(res,user.id)
        res.json({"Success":"User Created"});
    }
    else{
        res.status(403)//Forbidden
        throw new Error("Incorrect Credentials")
        //Server Crash Bairaxa Need to Fix this
    }
})

export const getProfile=asyncHandler(async(req,res)=>{
    res.json({"sucess":true})
})

export const logoutUser=asyncHandler(async(req,res)=>{
    res.cookie('jwt','',{
        httpOnly:true,
        secure:PRODUCTION,
        sameSite:"lax",
        maxAge: 0
    })
    res.json({"sucess":"Logout Sucessful"})
})