import db from "../db.js";
//Create the functions when database creates the tables
//in const sql = ``; write the queries

// Get all expenses
export const getAllExpenses = (req, res) => {
    const sql = `
        SELECT *
        FROM expenses
        ORDER BY date DESC
    `;
    db.query(sql, callback);
};

// Get expenses with filters
export const getFilteredExpenses = (req, res) => {
    let sql = `
        SELECT *
        FROM expenses
        WHERE 1=1
    `;
    const value = [];

    //Filter by month
    if(filters.month) {
        sql += `
            AND DATE_FORMAT(date, '%Y-%m') = ?
        `;
        value.push(filters.month);
    }

    //Filter by category
    if(filters.category) {
        sql += `
            AND category = ?
        `;
        value.push(filters.category);
    }

    sql+= `
        ORDER BY date DESC
    `;

    db.query(sql, value, callback);
};

//Insert expense
export const insertExpense = (req, res) => {
    const sql = `
        INSERT INTO expenses (title, amount, category, date, memo)
        VALUES (?, ?, ?, ?, ?)
    `; //Insert into expenses (title, amount, category, date, memo) VALUES (?, ?, ?, ?, ?)

    const values = [
        expense.title,
        expense.amount,
        expense.category,
        expense.date,
        expense.memo || null,
    ];

    db.query(sql, values, callback);

}

//delete expense
export const deleteExpense = (req, res) => {
    const sql = `
        DELETE FROM expenses
        WHERE id = ?
    `; //Delete from expenses where id = ?
    db.query(sql, [id], callback);
};

//Update expense
export const updateExpense = (req, res) => {
    const sql = `
        UPDATE expenses
        SET title = ?, amount = ?, category = ?, date = ?, memo = ?
        WHERE id = ?
    `; //Update expenses set title = ?, amount = ?, category = ?, date = ?, memo = ? where id = ?
    const values = [
        updatedExpense.title,
        updatedExpense.amount,
        updatedExpense.category,
        updatedExpense.date,
        updatedExpense.memo || null,
        id
    ];
    db.query(sql, values, callback);
}
