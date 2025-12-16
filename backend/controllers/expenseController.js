import { pool } from "../db.js";

export async function getExpenses(req, res, next) {
  try {
    const [rows] = await pool.query(
      `SELECT id, title, amount, category,
              DATE_FORMAT(date, '%Y-%m-%d') AS date,
              memo, created_at
       FROM expenses
       ORDER BY date DESC`
    );
    res.json(rows);
  } catch (e) {
    next(e);
  }
}

export async function addExpense(req, res, next) {
  try {
    const { title, amount, category, date, memo } = req.body;

    // schema has title NOT NULL, so provide a fallback if frontend doesn't send it
    const safeTitle = title?.trim() || memo?.trim() || "지출";

    if (amount == null || !category || !date) {
      return res.status(400).json({ message: "amount, category, date are required" });
    }

    const [result] = await pool.query(
      `INSERT INTO expenses (title, amount, category, date, memo)
       VALUES (?, ?, ?, ?, ?)`,
      [safeTitle, Number(amount), category, date, memo ?? null]
    );

    res.status(201).json({ id: result.insertId });
  } catch (e) {
    next(e);
  }
}

export async function deleteExpense(req, res, next) {
  try {
    const id = Number(req.params.id);
    const [result] = await pool.query(`DELETE FROM expenses WHERE id = ?`, [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Not found" });
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
}
