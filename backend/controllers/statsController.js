import db from '../db.js';

// Get statistics: total expenses, average expense, expenses by category
export const getStatistics = (req, res) => {

    const totalSql = `
        SELECT
            SUM(amount) AS totalAmount,
            AVG(amount) AS averageAmount
        FROM expenses
        WHERE DATE_FORMAT(date, '%Y-%m') = ?
    `;

    const categorySql = `
        SELECT
            category,
            SUM(amount) AS totalAmount
        FROM expenses
        WHERE DATE_FORMAT(date, '%Y-%m') = ?
        GROUP BY category
    `;

    db.query(totalSql, [month], (err, totalResult) => {
        if (err) return callback(err);

        db.query(categorySql, [month], (err, categoryResult) => {
            if (err) return callback(err);

            res.json({
                total: totalResult[0],
                byCategory: categoryResult
            });
        });
    });
};
