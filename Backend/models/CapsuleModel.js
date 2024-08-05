import { pool } from "../config/db.js";

export const insertCapsule = async (title, description, content, category, thumbnailUrl, imagesUrls) => {
  try {
    // Convert images array to a PostgreSQL array string
    const imagesArray = imagesUrls ? `{${imagesUrls.join(',')}}` : '{}';

    // Prepare the SQL query with parameter placeholders
    const query = `
      INSERT INTO capsules (title, description, content, category, thumbnail, images)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;

    // Execute the query with parameters
    const result = await pool.query(query, [title, description, content, category, thumbnailUrl, imagesArray]);

    return result.rows[0];
  } catch (err) {
    console.error('Error inserting capsule:', err);
    return undefined;
  }
};
