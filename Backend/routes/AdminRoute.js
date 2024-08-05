import { Router } from "express";
import { addCapsule } from "../controller/AdminController.js";
import { userOnly } from "../middleware/authMiddleware.js"
import {upload} from '../utils/UploadImage.js'
const router=Router();

router.route('/add').post(userOnly,upload.fields([{ name: 'thumbnail' }, { name: 'images' }]),addCapsule);
export default router;