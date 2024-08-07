import { pool } from "../config/db.js";

export const insertCapsule = async (title, description, content, category, thumbnailUrl, imagesUrls, pdf, author_id) => {
  try {
    // Convert images array to a PostgreSQL array string
    const imagesArray = imagesUrls.length ? `{${imagesUrls.join(',')}}` : '{}';

    // Prepare the SQL query with parameter placeholders
    const query = `
      INSERT INTO capsules (title, description, content, category, thumbnail, images, pdf, author_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
    `;

    // Execute the query with parameters
    const result = await pool.query(query, [title, description, content, category, thumbnailUrl, imagesArray, pdf, author_id]);

    return result.rows[0];
  } catch (err) {
    console.error('Error inserting capsule:', err);
    return undefined;
  }
};


//Reads Capsules from the db and return only general information
export const readCapsulesByCategoryWithLimit=async(category,limit)=>{
  try{
    const result = await pool.query(`SELECT id,title,description,thumbnail FROM capsules WHERE category = '${category}' ORDER BY id ASC LIMIT ${limit}`)
    return result.rows;
  }catch(err)
  {
    console.error("Error reading capsules by category ",err);
    return undefined;
  }
}

//Reads Capsule from the db and return all stored for specific capsule
export const readCapsuleById=async(id)=>
{
  try{
    const result=await pool.query(`SELECT * FROM capsules WHERE id = ${id}`)
    return result.rows[0];
  }catch(err)
  {
    console.error("Error reading capsule from id ",err);
    return undefined;
  }
}

//Delete Capsules by Id
export const deleteCapsuleById=async(id)=>{
  try{
    const result=await pool.query(`DELETE FROM capsules WHERE id = ${id}`)
    return result
  }
  catch(err)
  {
    console.error("Error Deleting Capsule by id ",err)
    return undefined
  }
}

//Update Capsule by Id and Column Name
export const updateCapsuleById=async(id,col,val)=>{
  try{
    const result=await pool.query(`UPDATE capsules SET ${col}='${val}' WHERE id=${id}`)
    return result
  }
  catch(err)
  {
    console.error("Error Updating Capsule by id ",err)
    return undefined
  }
}