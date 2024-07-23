import jwt from 'jsonwebtoken';
import {PRODUCTION} from '../constants.js'
import dotenv from 'dotenv';

dotenv.config();

export const generateToken=(res,userId)=>{
    const token=jwt.sign({userId},process.env.JWT_KEY,{
        expiresIn:'1d'
    });

    res.cookie('jwt',token,{
        httpOnly:true,
        secure:PRODUCTION,
        sameSite:"lax",
        maxAge: 24*60*60*1000
    })
}