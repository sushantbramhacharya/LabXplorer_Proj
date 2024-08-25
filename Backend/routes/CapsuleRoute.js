import { Router } from "express";
import { deleteCapsule, getAllCapsules, getCapsulesByCategory, getCapsulesById, getQuizByCapsuleId } from "../controller/CapsuleController.js";
import { adminOnly, userOnly } from "../middleware/authMiddleware.js";
const router=Router()

router.route('/').get(getCapsulesById)
router.route('/all').get(getAllCapsules)
router.route('/delete').delete(userOnly,deleteCapsule)
router.route('/category').get(getCapsulesByCategory)
router.route('/quizes').post()
router.route('/quizes').get(getQuizByCapsuleId)
export default router