import { useState } from "react";

function ExpenseList({ expenses, onDelete }) {
  const [openMenuId, setOpenMenuId] = useState(null);
  const [sortType, setSortType] = useState("date"); // date | amount
  const [categoryFilter, setCategoryFilter] = useState("전체");

  // 총 지출액
  const totalAmount = expenses.reduce(
    (sum, e) => sum + Number(e.amount),
    0
  );

  // 카테고리 목록 (필터용)
  const categories = ["전체", ...new Set(expenses.map((e) => e.category))];

  // 1️⃣ 필터
  const filteredExpenses =
    categoryFilter === "전체"
      ? expenses
      : expenses.filter((e) => e.category === categoryFilter);

  // 2️⃣ 정렬 (날짜 = 최신순)
  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    if (sortType === "date") {
      return new Date(b.date) - new Date(a.date);
    }
    if (sortType === "amount") {
      return Number(b.amount) - Number(a.amount);
    }
    return 0;
  });

  return (
    <div className="card">
      <h2>지출 목록</h2>

      <div style={{ marginBottom: 8, fontWeight: "bold" }}>
        총 지출: {totalAmount.toLocaleString()}원
      </div>

      {/* 정렬 + 필터 */}
      <div style={{ marginBottom: 12 }}>
        <label>
          <input
            type="radio"
            name="sort"
            checked={sortType === "date"}
            onChange={() => setSortType("date")}
          />
          날짜순(최신)
        </label>

        <label style={{ marginLeft: 10 }}>
          <input
            type="radio"
            name="sort"
            checked={sortType === "amount"}
            onChange={() => setSortType("amount")}
          />
          금액순
        </label>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          style={{ marginLeft: 16 }}
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {sortedExpenses.map((e) => (
          <li
            key={e.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            {/* 날짜 왼쪽 고정 */}
            <div style={{ display: "flex", gap: 12 }}>
              <span style={{ minWidth: 90 }}>{e.date}</span>
              <span>
                {e.category} | {e.amount.toLocaleString()}원
                {e.memo && ` | ${e.memo}`}
              </span>
            </div>

            {/* 케밥 메뉴 */}
            <div style={{ position: "relative" }}>
              <button
                onClick={() =>
                  setOpenMenuId(openMenuId === e.id ? null : e.id)
                }
              >
                ⋮
              </button>

              {openMenuId === e.id && (
                <div
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "100%",
                    background: "#fff",
                    border: "1px solid #ccc",
                    padding: 4,
                    zIndex: 10,
                  }}
                >
                  <button
                    onClick={() => {
                      onDelete(e.id);
                      setOpenMenuId(null);
                    }}
                  >
                    삭제
                  </button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseList;

