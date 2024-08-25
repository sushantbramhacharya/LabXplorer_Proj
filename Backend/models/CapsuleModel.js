import { pool } from "../config/db.js";

export const insertCapsule = async (title, description, content, category, thumbnailUrl, imagesUrls, pdf, author_id, simulationId) => {
  try {
    // Convert images array to a PostgreSQL array string
    const imagesArray = imagesUrls.length ? `{${imagesUrls.join(',')}}` : '{}';

    // Insert into the capsules table
    const insertCapsuleQuery = `
      INSERT INTO capsules (title, description, content, category, thumbnail, images, pdf, author_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id;
    `;
    const capsuleResult = await pool.query(insertCapsuleQuery, [title, description, content, category, thumbnailUrl, imagesArray, pdf, author_id]);

    const capsuleId = capsuleResult.rows[0].id;

    // Insert into the capsule_simulations table

    if (simulationId!=="None") {
      const insertSimulationQuery = `
        INSERT INTO capsule_simulations (capsule_id, simulation_id)
        VALUES ($1, $2);
      `;
      await pool.query(insertSimulationQuery, [capsuleId, simulationId]);
    }

    return { id: capsuleId, ...capsuleResult.rows[0] };
  } catch (err) {
    console.error('Error inserting capsule:', err);
    return undefined;
  }
};


//Get Capsules
export const readAllCapsules=async()=>{
  try{
    const result = await pool.query(`SELECT id,title,description,thumbnail FROM capsules ORDER BY id ASC `)
    return result.rows;
  }catch(err)
  {
    console.error("Error reading capsules by category ",err);
    return undefined;
  }
}

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
export const readCapsuleById = async (id) => {
  try {
    const query = `
      SELECT 
        c.*, 
    cs.simulation_id,
    s.name AS simulation_name,
    s.link AS simulation_link
      FROM 
        capsules c
      LEFT JOIN 
        capsule_simulations cs ON c.id = cs.capsule_id
      LEFT JOIN 
        simulations s ON cs.simulation_id = s.id
      WHERE 
        c.id = $1
    `;
    
    const result = await pool.query(query, [id]);
    
    const capsule = result.rows[0];
    
    const simulator = result.rows['simulation_id']

    return {
      ...capsule,
      simulations: simulator
    };
  } catch (err) {
    console.error('Error reading capsule from id:', err);
    return undefined;
  }
};


//Read Capsule By Name
export const readCapsuleByName=async(capName)=>
{
  try{
    const query = `SELECT * FROM capsules WHERE LOWER(TRIM(title)) LIKE LOWER(TRIM($1))`;
    const values = [`%${capName}%`];
    const result = await pool.query(query, values);
    return result.rows;
  }
  catch (err)
  {
    console.error("Errot Searching for "+capName+"  ERR:"+err);
    return undefined
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
export const updateCapsuleById = async (id, updates) => {
  try {
    // Build the SET clause dynamically for the capsules table
    const { simulators, ...capsuleUpdates } = updates; // Exclude simulators if present

    const setClause = Object.entries(capsuleUpdates)
      .map(([key, value]) => {
        // Handle potential array values or escape single quotes
        if (Array.isArray(value)) {
          return `${key}='${JSON.stringify(value)}'`;
        }
        return `${key}='${value.replace(/'/g, "''")}'`;
      })
      .join(', ');

    // Construct the SQL query for updating the capsules table
    const updateCapsuleQuery = `UPDATE capsules SET ${setClause} WHERE id=$1`;
    await pool.query(updateCapsuleQuery, [id]);

    // Handle the capsule_simulations table
    if (simulators && simulators !== "None") {
      // Remove existing simulations for this capsule
      const deleteSimulationsQuery = `
        DELETE FROM capsule_simulations WHERE capsule_id=$1;
      `;
      await pool.query(deleteSimulationsQuery, [id]);

      // Insert the new simulation if provided
      const insertSimulationQuery = `
        INSERT INTO capsule_simulations (capsule_id, simulation_id)
        VALUES ($1, $2);
      `;
      await pool.query(insertSimulationQuery, [id, simulators]);
    } else {
      // Ensure no simulations are linked if simulationId is "None" or not provided
      const deleteSimulationsQuery = `
        DELETE FROM capsule_simulations WHERE capsule_id=$1;
      `;
      await pool.query(deleteSimulationsQuery, [id]);
    }

    return { success: true };
  } catch (err) {
    console.error("Error updating capsule by id:", err);
    return undefined;
  }
};

//getQuiz
export const readQuizById = async (id) => {
  try {
    const result = await pool.query('SELECT * FROM quizzes WHERE capsule_id = $1', [id]);
    return result.rows; 
  } catch (err) {
    console.error('Error reading quiz by id', err);
    return undefined;
  }
};

//getOptions
export const getOptionsById=async (id) => {
  try {
    
    const result = await pool.query('SELECT * FROM options WHERE quiz_id = $1', [id]);
    return result.rows; 
  } catch (err) {
    console.error('Error reading quiz by id', err);
    return undefined;
  }
};
