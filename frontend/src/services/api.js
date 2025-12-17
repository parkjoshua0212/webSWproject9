import axios from "axios";

const API_URL = "http://localhost:3001"; 

export const getExpenses = async () => {
  const res = await axios.get(`${API_URL}/expenses`);
  return res.data;
};

export const addExpense = async (data) => {
  const res = await axios.post(`${API_URL}/expenses`, data);
  return res.data;
};

export const deleteExpense = async (id) => {
  await axios.delete(`${API_URL}/expenses/${id}`);
};
