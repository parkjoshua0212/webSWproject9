import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// 테스트용 메모리 저장소
let expenses = [];

// 기본 확인
app.get("/", (req, res) => {
  res.send("Expense Tracker API is running");
});

// 🔹 지출 목록 조회
app.get("/expenses", (req, res) => {
  res.json(expenses);
});

// 🔹 지출 추가
app.post("/expenses", (req, res) => {
  const newExpense = {
    id: Date.now(),
    ...req.body,
  };
  expenses.push(newExpense);
  res.json(newExpense);
});

// 🔹 지출 삭제
app.delete("/expenses/:id", (req, res) => {
  const id = Number(req.params.id);
  expenses = expenses.filter((e) => e.id !== id);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

