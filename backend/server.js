// backend/server.js
import dotenv from "dotenv";

// ✅ Force-load backend/.env regardless of where you run node from
dotenv.config({ path: new URL("./.env", import.meta.url) });

import express from "express";
import cors from "cors";

import expenseRoutes from "./routes/expenseRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";
import { pool } from "./db.js";

console.log("CWD:", process.cwd());
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_NAME:", process.env.DB_NAME);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ ok: false, db: "down", detail: e.message });
  }
});

app.use("/api/expenses", expenseRoutes);
app.use("/api/stats", statsRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Server error", detail: err.message });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
