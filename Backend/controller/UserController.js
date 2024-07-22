import { addUser, getUserByUsername } from "../models/UserModel.js";
import { hashPassword, verifyPassword } from "../utils/PasswordHashing.js";

export const loginUser=async (req,res)=>{
    const user= await getUserByUsername("tesdst");
    if(!user)
    {
        res.json({"Error":"No User found"});
    }
    else{
        const verification=await verifyPassword("test","$2b$10$9vee2wWYgpTzURhJM3X0F.WANI61rtYaPsaUYwPhmMu8LR1/nC95.")
        res.json({"Success":"User found","Verified":verification});
    }
}

export const registerUser=async (req,res)=>{
    const user= await addUser("sad","ads","sadasd");
    if(user)
    {
        const hashedPassword=await hashPassword("test")
        res.json({"Success":"User Created","Hashed":hashedPassword});
    }
    else{
        res.json({"Error":"Error Occuers"});
    }
}