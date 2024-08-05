import { Router } from "express";
import { addCapsule } from "../controller/AdminController.js";
import { userOnly } from "../middleware/authMiddleware.js";
import Uploader from "quill/modules/uploader.js";

const router=Router();

router.route('/add').post(userOnly,Uploader.fields([{ name: 'thumbnail' }, { name: 'images' }]),addCapsule);
export default router;