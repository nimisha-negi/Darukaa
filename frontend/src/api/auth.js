import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_URL}/auth`;

// REGISTER API
export const registerUser = async (formData) => {
  const res = await axios.post(`${BASE_URL}/register`, formData);
  return res.data;
};

// LOGIN API
export const loginUser = async (formData) => {
  const res = await axios.post(`${BASE_URL}/login`, formData);
  return res.data;
};
