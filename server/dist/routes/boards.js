"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const boardController_1 = require("../controllers/boardController");
const router = (0, express_1.Router)();
router.post("/", boardController_1.createBoard);
router.get("/", boardController_1.getBoards);
exports.default = router;
