import asyncHandler from '../middleware/asyncHandler.js'
import { deleteCapsuleById,
     readCapsuleById, 
     readCapsulesByCategoryWithLimit, 
     updateCapsuleById } 
     from '../models/CapsuleModel.js'


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


//Admin Only
export const deleteCapsule=asyncHandler(
    async(req,res,next)=>{
        const {capsuleId}=req.body
        const result=await deleteCapsuleById(id)
        if(result!==undefined)
        {
            res.json({"Success":"Successfully Deleted"})
        }
        else
        {
            throw new Error("Error Occured Deleting Check Server logs")
        }
    }
)

export const editCapsule=asyncHandler(
    async(req,res,next)=>{
        const {capsuleId,column,updatedData}=req.body
        const result=await updateCapsuleById(capsuleId,column,updatedData)
        if(result!==undefined)
            {
                res.json({"Success":"Successfully Deleted"})
            }
            else
            {
                throw new Error("Error Occured Editing Capsule Check Server logs")
            }
    }
)