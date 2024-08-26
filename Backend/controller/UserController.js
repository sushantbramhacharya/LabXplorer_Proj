import { addUser, getUserByUsername, verifyUser } from "../models/UserModel.js";
import { hashPassword, verifyPassword } from "../utils/PasswordHashing.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { PRODUCTION } from "../constants.js";
import { generateToken } from "../utils/GenerateToken.js";
import { generateVerificationToken } from "../utils/VerificationToke.js";
import { sendVerificationEmail } from "../utils/EmailService.js";

export const loginUser=asyncHandler(async (req,res)=>{
    const data=await req.body;
    const user= await getUserByUsername(data.username);
    
        if(!user)
            {
                res.status(404)
                throw new Error("User Not Found")
            }
            else{
               
                const verification=await verifyPassword(data.password,user.password)
                if(verification){
                    if(user.email_verified)
                    {
                        generateToken(res,user.id)
                        res.json({
                            id:user.id,
                            username:user.username,
                            email:user.email
                        });
                    }
                    else
                    {
                        res.status(401)
                        throw new Error("Please Verify Email First")
                    }
                }
                else{
                    res.status(401)
                    throw new Error("Incorrect Credentials")
                }
            }
    
   
   
})

export const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400); // Bad Request
        throw new Error("All fields are required");
    }

    const hashedPassword = await hashPassword(password);
    const verificationToken = generateVerificationToken();

    const userCreated = await addUser(username, email, hashedPassword, verificationToken);

    if (userCreated) {
        await sendVerificationEmail(email, verificationToken);

        res.status(201).json({ success: "User Created. Please verify your email." });
    } else {
        res.status(403); // Forbidden
        throw new Error("User could not be created");
    }
});

//Verfiy User
export const verifyEmail = asyncHandler(async (req, res) => {
    const { token } = req.query;

    if (!token) {
        res.status(400); // Bad Request
        throw new Error("Verification token is required");
    }

    const userVerified = await verifyUser(token);

    if (userVerified) {
        res.status(200).send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Email Verification Success</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f0f4f8;
                        color: #333;
                        text-align: center;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        height: 100vh;
                    }
                    .message {
                        background-color: #ffffff;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        max-width: 500px;
                        width: 100%;
                    }
                    h1 {
                        font-size: 24px;
                        color: #4CAF50;
                        margin: 0;
                    }
                    p {
                        font-size: 16px;
                        margin-top: 10px;
                        color: #555;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="message">
                        <h1>Email Verified Successfully</h1>
                        <p>Your email address has been successfully verified. You can now log in to your account.</p>
                    </div>
                </div>
            </body>
            </html>
            `);
    } else {
        res.status(400); // Bad Request
        throw new Error("Invalid or expired token");
    }
});

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