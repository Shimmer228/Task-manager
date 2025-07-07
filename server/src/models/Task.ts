import { Schema, model } from "mongoose";

const TaskSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  status: { type: String, enum: ["todo", "inprogress", "done"], default: "todo" },
  boardId: { type: String, required: true },
  order: {type: Number, required: true }
}, { timestamps: true });

export const Task = model("Task", TaskSchema);
