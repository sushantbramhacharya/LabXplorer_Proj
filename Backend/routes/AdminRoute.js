import { Router } from "express";
import { addCapsule, allSimulations, setSimulation, simulationsByCategory } from "../controller/AdminController.js";
import { userOnly } from "../middleware/authMiddleware.js"
import {upload} from '../utils/UploadImage.js'
import { editCapsule } from "../controller/CapsuleController.js";
const router=Router();


//change this to capsules later
router.route('/add').post(userOnly,upload.fields([{ name: 'thumbnail' }, { name: 'images' },{ name: 'pdf' }]),addCapsule);
router.route('/edit-capsule').put(userOnly,upload.fields([{ name: 'thumbnail' }, { name: 'images' },{ name: 'pdf' }]),editCapsule)
//creating Simulations
router.route('/simulations').post(userOnly,setSimulation)

//reading Simulations
router.route('/simulations/category').get(simulationsByCategory)
router.route('/simulations').get(allSimulations)

export default router;
