import asyncHandler from '../middleware/asyncHandler.js'
import { readCapsuleById, readCapsulesByCategoryWithLimit } from '../models/CapsuleModel.js'


export const getCapsulesByCategory=asyncHandler(
    async(req,res,next)=>{
        const {category}=req.body
        const capsules=await readCapsulesByCategoryWithLimit(category,5)
        if(capsules[0]?.id)
        {
            res.json(capsules)
        }
        else{
            throw new Error("Some Error Happened in retriving Capsules check server log for details")
        }
    }
)

export const getCapsulesById=asyncHandler(
    async(req,res,next)=>{
        const {capsuleId}=req.body
        const capsule=await readCapsuleById(capsuleId)
        if(capsule?.id)
        {
            res.json(capsule)
        }
        else{
            throw new Error("Some Error Happened while retriving Capsule check Server log for details")
        }
    }
)