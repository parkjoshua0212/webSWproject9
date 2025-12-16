import axios from "axios";

export const getExpenses = () => axios.get("/api/expenses");
export const addExpense = (data) => axios.post("/api/expenses", data);
export const deleteExpense = (id) => axios.delete(`/api/expenses/${id}`);
