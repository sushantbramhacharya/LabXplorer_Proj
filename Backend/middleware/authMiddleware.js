import { getUserById } from "../models/UserModel.js";
import asyncHandler from "./asyncHandler.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const userOnly=asyncHandler(async (req,res,next)=>{
    const token=req.cookies.jwt;

    if(token)
    {
        try{
            const decoded=jwt.verify(token,process.env.JWT_KEY);
            req.user=await getUserById(decoded.userId);
            if(req.user)
            {
                next();
            }
            else{
                res.status(401)
                throw new Error("User Not Found")
            }
        }
        catch(err)
        {
            res.status(401)
            throw new Error("Invalid Token")
        }
    }
    else{
        res.status(404)
        throw new Error("Not Authorized")
    }
})