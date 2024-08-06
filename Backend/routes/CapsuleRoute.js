import { Router } from "express";
import { getCapsulesByCategory, getCapsulesById } from "../controller/CapsuleController.js";
const router=Router()

router.route('/').get(getCapsulesById)
router.route('/category').get(getCapsulesByCategory)

export default router