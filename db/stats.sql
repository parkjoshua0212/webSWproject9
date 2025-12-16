-- 월별 총 지출 및 평균 지출
SELECT
    DATE_FORMAT(date, '%Y-%m') AS month,
    SUM(amount) AS totalAmount,
    AVG(amount) AS averageAmount
FROM expenses
GROUP BY month
ORDER BY month;

-- 특정 월의 카테고리별 지출
SELECT
    category,
    SUM(amount) AS totalAmount
FROM expenses
WHERE DATE_FORMAT(date, '%Y-%m') = ?
GROUP BY category;
