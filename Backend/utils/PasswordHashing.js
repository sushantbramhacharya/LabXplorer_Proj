import bycrypt from 'bcrypt';

const saltRounds=10;

export const hashPassword=async(password)=>{
    //hashes password with salt rounds
    return await bycrypt.hash(password,saltRounds)
}

export const verifyPassword=async(password,hashedPassword)=>{
    //Returns Bool if Password is verified
    return await bycrypt.compare(password,hashedPassword);
}