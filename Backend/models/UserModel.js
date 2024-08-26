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
export const getUserById=async(id)=>{
    try{
        const result = await pool.query(`SELECT * FROM Users WHERE id='${id}'`)
        return result.rows[0]
    }
    catch(err)
    {
        throw new Error("Error occured in DB")
    }
}
export const addUser = async (username, email, password, verificationToken) => {
    const result = await pool.query(
        'INSERT INTO users (username, email, password, email_verification_token) VALUES ($1, $2, $3, $4) RETURNING *',
        [username, email, password, verificationToken]
    );
    return result.rows[0];
};

// Verify user by token
export const verifyUser = async (token) => {
    const result = await pool.query(
        'UPDATE users SET email_verified = TRUE, email_verification_token = NULL WHERE email_verification_token = $1 RETURNING *',
        [token]
    );
    return result.rows[0];
};