import { json } from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import { readCapsuleByName } from "../models/CapsuleModel.js";
import { readSimulationsByName } from "../models/SimulationModel.js";

export const getSearchItems=asyncHandler(async(req,res,next)=>{
    const {qryName}=req.query;
    const simulations=await readSimulationsByName(qryName);
    const capsules=await readCapsuleByName(qryName);
    let response={};
    if(simulations?.length>0)
    {
        response.simulations = [...simulations];
    }
    if(capsules?.length>0)
    {
        response.capsules = [...capsules];
    }
    res.json(response);
})