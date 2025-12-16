// backend/db.js
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Build an absolute path to backend/.env
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.join(__dirname, ".env");

// Load env
const result = dotenv.config({ path: envPath });

// Debug: shows if dotenv loaded or errored
if (result.error) {
  console.error("[dotenv] Failed to load .env from:", envPath);
  console.error(result.error);
} else {
  console.log("[dotenv] Loaded .env from:", envPath);
}

console.log("[db] DB_USER =", JSON.stringify(process.env.DB_USER));
console.log("[db] DB_NAME =", JSON.stringify(process.env.DB_NAME));
console.log("[db] DB_HOST =", JSON.stringify(process.env.DB_HOST));
console.log("[db] DB_PORT =", JSON.stringify(process.env.DB_PORT));

export const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 3306),

  // fallback just to prevent '' (but better to fix .env)
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "expense_tracker",

  // ✅ IMPORTANT: fix Korean/emoji/etc
  charset: "utf8mb4",

  waitForConnections: true,
  connectionLimit: 10,
});
