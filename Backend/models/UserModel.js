import { pool } from "../config/db.js"

export const getUserByUsername=async(username)=>{
    try{
        const result = await pool.query(`SELECT * FROM Users WHERE username='${username}'`)
        return result.rows[0]
    }
    catch(err)
    {
        throw new Error("Error occured in DB")
    }
}

export const addUser=async(username,email,password)=>{
    const result = await pool.query(`INSERT INTO Users(username,email,password) VALUES('${username}','${email}','${password}')`)
    return result
}