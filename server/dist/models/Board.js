import mongoose from "mongoose";
const boardSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
export const Board = mongoose.model("Board", boardSchema);
