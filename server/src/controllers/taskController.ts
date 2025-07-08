import { Request, Response } from "express";
import { Task } from "../models/Task";

export const getTasks = async (req: Request, res: Response) => {
  const { boardId } = req.params;

  try {
    const tasks = await Task.find({ boardId }).sort({ status: 1, order: 1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};


export const createTask = async (req: Request, res: Response) => {
  const { boardId } = req.params;
  const { title, description, status } = req.body;
  console.log("Create task request body:", req.body);
  console.log("Looking for maxOrderTask with:", { boardId, status });
  const maxOrderTask = await Task.findOne({ boardId, status }).sort("-order");
  console.log("maxOrderTask:", maxOrderTask);
  const newOrder = maxOrderTask ? maxOrderTask.order + 1 : 0;
  console.log("newOrder:", newOrder);



  try {
    const maxOrderTask = await Task.findOne({ boardId, status }).sort("-order");
    const newOrder = maxOrderTask ? maxOrderTask.order + 1 : 0;

    const task = new Task({
      title,
      description,
      status,
      boardId,
      order: newOrder
    });

    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: "Failed to create task" });
  }
};


export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updated = await Task.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updated);
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  await Task.findByIdAndDelete(id);
  res.sendStatus(204);
};

export const reorderTasks = async (req: Request, res: Response) => {
  const { tasks }: { tasks: { _id: string; order: number }[] } = req.body;
  try {
    for (const { _id, order } of tasks) {
      await Task.findByIdAndUpdate(_id, { order });
    }
    res.status(200).json({ message: "Order updated" });
  } catch (err) {
    res.status(500).json({ error: "Failed to reorder tasks" });
  }
};
