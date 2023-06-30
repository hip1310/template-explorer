import {get,post} from "../controllers/home";
// const { get, post } = home;
// import { post } from "../controllers/addTemplate.js";
import { Router } from "express";
const router = Router();

router.get("/", [get]);
router.post("/add", [post]);

export default router;
