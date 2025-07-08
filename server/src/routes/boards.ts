import { Router } from "express";
import { createBoard, getBoards } from "../controllers/boardController.ts";

const router = Router();

router.post("/", createBoard);
router.get("/", getBoards);

export default router;
