import express from "express";
import path from "path";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
// app.use("/api/...", yourRoutes);

app.use(express.static(path.join(__dirname, "client")));

app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "client", "index.html"));
});

mongoose.connect(process.env.MONGO_URI || "")
  .then(() => {
    app.listen(PORT, () => console.log(`Server on port ${PORT}`));
  })
  .catch((err) => console.error("DB error:", err));
