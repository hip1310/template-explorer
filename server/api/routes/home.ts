import { deleteTemplate, get, getById, post, put } from "../controllers/home";
import { Router } from "express";
const router = Router();

router.get("/", [get]);
router.get("/getById/:id", [getById]);
router.post("/add", [post]);
router.put("/update", [put]);
router.delete("/delete/:id", [deleteTemplate]);

export default router;
