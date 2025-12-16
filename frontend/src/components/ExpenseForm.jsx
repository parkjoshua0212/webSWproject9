import { useState } from "react";

function ExpenseForm({ onAdd }) {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [category, setCategory] = useState("기타");
  const [memo, setMemo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // 금액 없으면 추가 안 함
    if (!amount) return;

    onAdd({ amount, date, category, memo });

    setAmount("");
    setMemo("");
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>지출 추가</h2>

      <div style={{ marginBottom: 8 }}>
        <input
          type="number"
          min="0"
          placeholder="금액"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: 8 }}>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: 8 }}>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="기타">기타</option>
          <option value="식비">식비</option>
          <option value="교통">교통</option>
        </select>
      </div>

      <div style={{ marginBottom: 12 }}>
        <input
          placeholder="메모"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
        />
      </div>

      <button type="submit">추가</button>
    </form>
  );
}

export default ExpenseForm;
