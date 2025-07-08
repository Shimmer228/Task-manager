"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reorderTasks = exports.deleteTask = exports.updateTask = exports.createTask = exports.getTasks = void 0;
const Task_1 = require("../models/Task");
const getTasks = async (req, res) => {
    const { boardId } = req.params;
    try {
        const tasks = await Task_1.Task.find({ boardId }).sort({ status: 1, order: 1 });
        res.json(tasks);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch tasks" });
    }
};
exports.getTasks = getTasks;
const createTask = async (req, res) => {
    const { boardId } = req.params;
    const { title, description, status } = req.body;
    console.log("Create task request body:", req.body);
    console.log("Looking for maxOrderTask with:", { boardId, status });
    const maxOrderTask = await Task_1.Task.findOne({ boardId, status }).sort("-order");
    console.log("maxOrderTask:", maxOrderTask);
    const newOrder = maxOrderTask ? maxOrderTask.order + 1 : 0;
    console.log("newOrder:", newOrder);
    try {
        const maxOrderTask = await Task_1.Task.findOne({ boardId, status }).sort("-order");
        const newOrder = maxOrderTask ? maxOrderTask.order + 1 : 0;
        const task = new Task_1.Task({
            title,
            description,
            status,
            boardId,
            order: newOrder
        });
        await task.save();
        res.status(201).json(task);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to create task" });
    }
};
exports.createTask = createTask;
const updateTask = async (req, res) => {
    const { id } = req.params;
    const updated = await Task_1.Task.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updated);
};
exports.updateTask = updateTask;
const deleteTask = async (req, res) => {
    const { id } = req.params;
    await Task_1.Task.findByIdAndDelete(id);
    res.sendStatus(204);
};
exports.deleteTask = deleteTask;
const reorderTasks = async (req, res) => {
    const { tasks } = req.body;
    try {
        for (const { _id, order } of tasks) {
            await Task_1.Task.findByIdAndUpdate(_id, { order });
        }
        res.status(200).json({ message: "Order updated" });
    }
    catch (err) {
        res.status(500).json({ error: "Failed to reorder tasks" });
    }
};
exports.reorderTasks = reorderTasks;
