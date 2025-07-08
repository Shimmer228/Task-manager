import { Request, Response } from "express";
import { Board } from "../models/Board.ts";
import { nanoid } from "nanoid";

export const createBoard = async (_: Request, res: Response) => {
  try {
    const board = await Board.create({ id: nanoid() });
    res.json({ id: board.id });
  } catch (err: any) {
    console.error("Failed to create board:", err.message);
    res.status(500).json({ error: "Failed to create board" });
  }
};
export const getBoards = async (_: Request, res: Response) => {
  try {
    const boards = await Board.find();
    res.json(boards);
  } catch (err: any) {
    console.error("Failed to get boards:", err.message);
    res.status(500).json({ error: "Failed to get boards" });
  }
};