import { Board } from "../models/Board";
import { nanoid } from "nanoid";
export const createBoard = async (_, res) => {
    try {
        const board = await Board.create({ id: nanoid() });
        res.json({ id: board.id });
    }
    catch (err) {
        console.error("Failed to create board:", err.message);
        res.status(500).json({ error: "Failed to create board" });
    }
};
export const getBoards = async (_, res) => {
    try {
        const boards = await Board.find();
        res.json(boards);
    }
    catch (err) {
        console.error("Failed to get boards:", err.message);
        res.status(500).json({ error: "Failed to get boards" });
    }
};
