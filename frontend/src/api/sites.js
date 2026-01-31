import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL + "/api/v1",
});

// ✅ attach token automatically
API.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("token") || localStorage.getItem("access_token");

  console.log("TOKEN SENT:", token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ✅ CREATE SITE
export const createSite = async (payload) => {
  const res = await API.post("/sites/", payload);
  return res.data;
};

// ✅ GET SITES BY PROJECT
export const getSitesByProject = async (projectId) => {
  const res = await API.get(`/sites/?projectId=${projectId}`);
  return res.data;
};

// ✅ GET ALL SITES (global analytics map)
export const getAllSites = async () => {
  const res = await API.get("/sites/all");
  return res.data;
};

// ✅ DELETE SITE
export const deleteSite = async (siteId) => {
  await API.delete(`/sites/${siteId}`);
};
