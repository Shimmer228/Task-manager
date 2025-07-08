// server/index.ts
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./db.js";
import taskRoutes from "./routes/tasks";
import boardRoutes from "./routes/boards";




const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "client")));
// API
app.use("/api/tasks", taskRoutes);
app.use("/api/boards", boardRoutes);

// React static build
const clientPath = path.join(__dirname, "..", "client");
app.use(express.static(clientPath));
app.get("*", (_, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

// Start
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
