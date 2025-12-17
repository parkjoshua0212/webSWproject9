function Stats({ expenses }) {
  const CATEGORY_COLORS = {
    식비: "#FF8A80",
    교통: "#82B1FF",
    기타: "#BDBDBD",
  };

  const categoryTotals = expenses.reduce((acc, cur) => {
    const category = cur.category || "기타";
    acc[category] = (acc[category] || 0) + Number(cur.amount);
    return acc;
  }, {});

  const totalAmount = Object.values(categoryTotals).reduce(
    (sum, v) => sum + v,
    0
  );

  let currentAngle = 0;
  const pieSections = Object.entries(categoryTotals).map(
    ([category, value]) => {
      const percent = totalAmount ? (value / totalAmount) * 100 : 0;
      const start = currentAngle;
      const end = currentAngle + percent;
      currentAngle = end;

      return `${CATEGORY_COLORS[category] || "#999"} ${start}% ${end}%`;
    }
  );

  return (
    <div className="card">
      <h2>카테고리별 지출</h2>

      <div style={{ marginBottom: 8, fontWeight: "bold" }}>
        총 지출: {totalAmount.toLocaleString()}원
      </div>

      {Object.entries(categoryTotals).length === 0 && (
        <p>데이터가 없습니다.</p>
      )}

      {totalAmount > 0 && (
        <div
          style={{
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: `conic-gradient(${pieSections.join(", ")})`,
            margin: "20px auto",
          }}
        />
      )}

      {Object.entries(categoryTotals).map(([category, value]) => {
        const percent = totalAmount
          ? Math.round((value / totalAmount) * 100)
          : 0;

        return (
          <div key={category} style={{ marginBottom: 6 }}>
            {category} ({value.toLocaleString()}원, {percent}%)
          </div>
        );
      })}
    </div>
  );
}

export default Stats;
