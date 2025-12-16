import { useEffect, useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Stats from "./components/Stats";
import { getExpenses, addExpense, deleteExpense } from "./services/api";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [activeTab, setActiveTab] = useState("list");

  async function refresh() {
    const resp = await getExpenses();
    setExpenses(resp.data);
  }

  useEffect(() => {
    refresh();
  }, []);

  const handleAdd = async (data) => {
    await addExpense(data);
    await refresh();
  };

  const handleDelete = async (id) => {
    await deleteExpense(id);
    setExpenses((prev) => prev.filter((e) => e.id !== id));
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
        <ExpenseList expenses={expenses} onDelete={handleDelete} />
      )}

      {activeTab === "chart" && <Stats expenses={expenses} />}
    </div>
  );
}

export default App;
