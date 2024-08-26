import { pool } from "../config/db.js";
export const addFavourite = async (user_id, capsule_id) => {
    const query = 'INSERT INTO favourites (user_id, capsule_id) VALUES ($1, $2) RETURNING *';
    const values = [user_id, capsule_id];
    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (err) {
      throw new Error('Error adding favourite: ' + err.message);
    }
  };
  
  // Remove a favourite
 export const removeFavourite = async (user_id, capsule_id) => {
    const query = 'DELETE FROM favourites WHERE user_id = $1 AND capsule_id = $2';
    const values = [user_id, capsule_id];
    try {
      const result = await pool.query(query, values);
      return result.rowCount > 0;
    } catch (err) {
      throw new Error('Error removing favourite: ' + err.message);
    }
  };
  
  // Get all favourites for a user
 export const getUserFavourites = async (user_id) => {
    const query = `
      SELECT c.id, c.title, c.thumbnail
      FROM favourites f
      JOIN capsules c ON f.capsule_id = c.id
      WHERE f.user_id = $1
    `;
    const values = [user_id];
    try {
      const result = await pool.query(query, values);
      return result.rows;
    } catch (err) {
      throw new Error('Error retrieving favourites: ' + err.message);
    }
  };

  export const getCapsuleFavouriteInfo = async (user_id, capsule_id) => {
    const query = `
      SELECT 1
      FROM favourites
      WHERE user_id = $1 AND capsule_id = $2
    `;
    const values = [user_id, capsule_id];
    
    try {
      const result = await pool.query(query, values);
      // Check if any rows are returned
      return result.rowCount > 0;
    } catch (err) {
      throw new Error('Error retrieving favourites: ' + err.message);
    }
  };
  
