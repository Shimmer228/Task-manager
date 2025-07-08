import { Router } from "express";
import { getTasks, createTask, updateTask, deleteTask, reorderTasks } from "../controllers/taskController";
const router = Router();
router.put("/reorder", reorderTasks);
router.get("/:boardId", getTasks);
router.post("/:boardId", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
export default router;
