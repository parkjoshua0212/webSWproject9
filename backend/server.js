import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let expenses = [];
let nextId = 1;

app.get("/",    (req, res) => {
  res.send("Simple expense tracker API");
});

app.get("/expenses", (req, res) => {
  res.json(expenses);
});

app.post("/expenses", (req, res) => {
    const {title, amount, date} = req.body;

    if (!title || !amount) {
        return res.status(400).json({error: "Title and amount are required"});
    }

    const newExpense = {
        id: nextId++,
        title,
        amount: Number(amount),
        date: date || new Date().toISOString().split('T')[0],
    };

    expenses.push(newExpense);
    res.status(201).json(newExpense);
});

app.delete("/expenses/:id", (req, res) => {
    const {id} =Number(req.params.id);
    expenses = expenses.filter(expense => expense.id !== id);
    res.sendStatus(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


