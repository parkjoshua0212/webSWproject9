import { useEffect, useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Stats from "./components/Stats";

//  백엔드 API 연결
import {
  getExpenses,
  addExpense,
  deleteExpense,
} from "./services/api";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [activeTab, setActiveTab] = useState("list");

  // 최초 로딩 시 DB에서 지출 목록 가져오기
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const data = await getExpenses();
        setExpenses(data);
      } catch (err) {
        console.error("지출 목록 불러오기 실패", err);
      }
    };

    fetchExpenses();
  }, []);

  // 지출 추가 (DB 저장)
  const handleAdd = async (expense) => {
    try {
      const savedExpense = await addExpense(expense);
      setExpenses((prev) => [...prev, savedExpense]);
    } catch (err) {
      console.error("지출 추가 실패", err);
    }
  };

  // 지출 삭제 (DB 반영)
  const handleDelete = async (id) => {
    try {
      await deleteExpense(id);
      setExpenses((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      console.error("지출 삭제 실패", err);
    }
  };

  return (
    <div className="container">
      <h1>가계부</h1>

      <ExpenseForm onAdd={handleAdd} />

      <div style={{ marginTop: 20 }}>
        <button
          className={activeTab === "list" ? "tab active" : "tab"}
          onClick={() => setActiveTab("list")}
        >
          지출 목록
        </button>

        <button
          className={activeTab === "chart" ? "tab active" : "tab"}
          onClick={() => setActiveTab("chart")}
          style={{ marginLeft: 10 }}
        >
          통계
        </button>
      </div>

      {activeTab === "list" && (
        <ExpenseList
          expenses={expenses}
          onDelete={handleDelete}
        />
      )}

      {activeTab === "chart" && (
        <Stats expenses={expenses} />
      )}
    </div>
  );
}

export default App;
