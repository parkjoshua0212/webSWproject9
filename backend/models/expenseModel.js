import db from "../db.js";
//Create the functions when database creates the tables
//in const sql = ``; write the queries

// Get all expenses
export const getAllExpenses = (req, res) => {
    const sql = ``;
    db.query(sql, callback);
};

// Get expenses with filters
export const getFilteredExpenses = (req, res) => {
    let sql = ``;
    const value = [];

    //Filter by month
    if(filters.month) {
        sql += ``;
        value.push(filters.month);
    }

    //Filter by category
    if(filters.category) {
        sql += ``;
        value.push(filters.category);
    }

    sql+= ``;

    db.query(sql, value, callback);
};

//Insert expense
export const insertExpense = (req, res) => {
    const sql = ``; //Insert into expenses (title, amount, category, date, memo) VALUES (?, ?, ?, ?, ?)

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
    const sql = ``; //Delete from expenses where id = ?
    db.query(sql, [id], callback);
};

//Update expense
export const updateExpense = (req, res) => {
    const sql = ``; //Update expenses set title = ?, amount = ?, category = ?, date = ?, memo = ? where id = ?
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