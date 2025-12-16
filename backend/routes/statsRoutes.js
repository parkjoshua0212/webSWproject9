import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const month = req.query.month; // YYYY-MM
    if (!month) return res.status(400).json({ message: "month=YYYY-MM required" });

    const [[total]] = await pool.query(
      `SELECT SUM(amount) AS totalAmount, AVG(amount) AS averageAmount
       FROM expenses
       WHERE DATE_FORMAT(date, '%Y-%m') = ?`,
      [month]
    );

    const [byCategory] = await pool.query(
      `SELECT category, SUM(amount) AS totalAmount
       FROM expenses
       WHERE DATE_FORMAT(date, '%Y-%m') = ?
       GROUP BY category
       ORDER BY totalAmount DESC`,
      [month]
    );

    res.json({ month, total: total ?? {}, byCategory });
  } catch (e) {
    next(e);
  }
});

export default router;
