"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const mongoose_1 = require("mongoose");
const TaskSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: String,
    status: { type: String, enum: ["todo", "inprogress", "done"], default: "todo" },
    boardId: { type: String, required: true },
    order: { type: Number, required: true }
}, { timestamps: true });
exports.Task = (0, mongoose_1.model)("Task", TaskSchema);
