import express from "express";
import cors from "cors";
import path from "path";
import { connectDB } from "./db";
import taskRoutes from "./routes/tasks";
import boardRoutes from "./routes/boards";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


app.use("/api/tasks", taskRoutes);
app.use("/api/boards", boardRoutes);


app.use(express.static(path.join(__dirname, "client", "dist")));


app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});


connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
