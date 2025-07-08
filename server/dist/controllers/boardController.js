"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBoards = exports.createBoard = void 0;
const Board_1 = require("../models/Board");
const nanoid_1 = require("nanoid");
const createBoard = async (_, res) => {
    try {
        const board = await Board_1.Board.create({ id: (0, nanoid_1.nanoid)() });
        res.json({ id: board.id });
    }
    catch (err) {
        console.error("Failed to create board:", err.message);
        res.status(500).json({ error: "Failed to create board" });
    }
};
exports.createBoard = createBoard;
const getBoards = async (_, res) => {
    try {
        const boards = await Board_1.Board.find();
        res.json(boards);
    }
    catch (err) {
        console.error("Failed to get boards:", err.message);
        res.status(500).json({ error: "Failed to get boards" });
    }
};
exports.getBoards = getBoards;
