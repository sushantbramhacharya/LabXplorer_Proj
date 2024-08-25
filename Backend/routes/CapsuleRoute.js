import { Router } from "express";
import { deleteCapsule, getAllCapsules, getCapsulesByCategory, getCapsulesById, getQuizByCapsuleId, updateQuizzes } from "../controller/CapsuleController.js";
import { adminOnly, userOnly } from "../middleware/authMiddleware.js";
const router=Router()

router.route('/').get(getCapsulesById)
router.route('/all').get(getAllCapsules)
router.route('/delete').delete(userOnly,deleteCapsule)
router.route('/category').get(getCapsulesByCategory)
router.route('/quizes').get(getQuizByCapsuleId)

// Quiz edit route
router.route('/quizes/').put(updateQuizzes);
  
export default router