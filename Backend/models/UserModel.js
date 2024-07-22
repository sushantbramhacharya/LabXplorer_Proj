import { pool } from "../config/db.js";

export const getUserByUsername=async(username)=>{
    const result = await pool.query(`SELECT * FROM Users WHERE username='${username}'`);
    return result.rows[0];
}