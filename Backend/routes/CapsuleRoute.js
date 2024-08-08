import { Router } from "express";
import { getAllCapsules, getCapsulesByCategory, getCapsulesById, getQuizByCapsuleId } from "../controller/CapsuleController.js";
const router=Router()

router.route('/').get(getCapsulesById)
router.route('/all').get(getAllCapsules)
router.route('/category').get(getCapsulesByCategory)
router.route('/quizes').post()
router.route('/quizes').get(getQuizByCapsuleId)
export default router