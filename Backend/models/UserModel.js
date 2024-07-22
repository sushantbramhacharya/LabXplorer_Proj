import { pool } from "../config/db.js";

export const getUserByUsername=async(username)=>{
    const result = await pool.query(`SELECT * FROM Users WHERE username='${username}'`);
    return result.rows[0];
}

export const addUser=async(username,email,password)=>{
    const result = await pool.query(`INSERT INTO Users(username,email,password) VALUES('${username}','${email}','${password}')`);
    return result;
}