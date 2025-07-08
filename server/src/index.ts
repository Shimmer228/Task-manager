import express from "express";
import cors from "cors";
import { connectDB } from "./db";
import taskRoutes from "./routes/tasks";
import boardRoutes from "./routes/boards";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

try {
  app.use("/api/tasks", taskRoutes);
  app.use("/api/boards", boardRoutes);
} catch (err) {
  console.error("Route setup error:", err);
}


connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
