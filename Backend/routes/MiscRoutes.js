import { Router } from "express";
import { getSearchItems } from "../controller/MiscControllers.js";

const router=Router();

router.route("/search").get(getSearchItems)

export default router