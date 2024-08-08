import { pool } from "../config/db.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { insertCapsule } from "../models/CapsuleModel.js";
import { getAllSimulations, getSimulationByCategory, insertSimulations } from "../models/SimulationModel.js";

export const addCapsule = asyncHandler(async (req, res, next) => {
  const { title, description, content, category, author_id } = req.body;
  const thumbnail = req.files['thumbnail'] ? req.files['thumbnail'][0].path : '';
  const images = req.files['images'] ? req.files['images'].map(file => file.path) : [];
  const pdf = req.files['pdf'] ? req.files['pdf'][0].path : '';

  try {
    const result = await insertCapsule(title, description, content, category, thumbnail, images, pdf, req.user.id);
    if (result) {
      res.json({ success: "Successfully added" });
    } else {
      throw new Error("Cannot add capsule");
    }
  } catch (error) {
    next(error);
  }
});


//Simulations Controls for admins
// Retriving Simulations
export const simulationsByCategory=asyncHandler(
  async(req,res,next)=>
  {
    const {category}=req.params;
    const result=await getSimulationByCategory(category)
    if(result[0]?.id)
    {
      res.json(result)
    }
    else{
      throw new Error("Error reading Simulations see server log")
    }
  }
)
//Retriving all Simulations
export const allSimulations=asyncHandler(
  async(req,res,next)=>{
    const result=await getAllSimulations()
    if(result[0]?.id)
    {
      res.json(result)
    }
    else{
      throw new Error("Error Fetching all simulations see serverlog")
    }
  }
)
// Setting Simulations
export const setSimulation=asyncHandler(
  async(req,res,next)=>{
    const {name,description,link,category}=req.body
    const result=await insertSimulations(name,description,link,category)
    if(result)
    {
      res.json({"Success":"Sucessfully Inserted"})
    }
    else{
      throw new Error("Error inserting Simulation Check server log")
    }
  }
)