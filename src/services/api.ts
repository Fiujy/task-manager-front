import axios from "axios";

const API_BASE_URL = "https://task-manager-back-aj6a.onrender.com/tasks";

export const getTasks = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

export const createTask = async (task: { title: string; description: string }) => {
  const response = await axios.post(API_BASE_URL, task);
  return response.data;
};

export const deleteTask = async (id: number) => {
  const response = await axios.delete(`${API_BASE_URL}/${id}`);
  return response.data;
};