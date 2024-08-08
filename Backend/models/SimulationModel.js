import {pool} from '../config/db.js'


export const getSimulationByCategory=async(category)=>{
    try{
        const result=await pool.query(`SELECT * FROM simulations WHERE category = '${category}'`);
        return result.rows
    }
    catch(error)
    {
        console.error("Error occured while querying into simulations by category : ",error)
        return undefined
    }
}

export const getAllSimulations=async()=>{
    try{
        const result=await pool.query(`SELECT * FROM simulations`);
        return result.rows
    }
    catch(error)
    {
        console.error("Error occured while querying for all into simulations : ",error)
        return undefined
    }
}

export const insertSimulations=async(name,description,link,category)=>{
    try{
        const result=await pool.query(`INSERT INTO simulations(name,description,link,category) VALUES('${name}','${description}','${link}','${category}')`)
        return result
    }
    catch(error)
    {
        console.error("Error ocurred while inserting into simulations : ",error)
        return undefined
    }
}