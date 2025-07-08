"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const db_js_1 = require("./db.js");
const tasks_1 = __importDefault(require("./routes/tasks"));
const boards_1 = __importDefault(require("./routes/boards"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/tasks", tasks_1.default);
app.use("/api/boards", boards_1.default);
app.use(express_1.default.static(path_1.default.join(__dirname, "client", "dist")));
app.get("*", (_, res) => {
    res.sendFile(path_1.default.join(__dirname, "client", "dist", "index.html"));
});
(0, db_js_1.connectDB)().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
