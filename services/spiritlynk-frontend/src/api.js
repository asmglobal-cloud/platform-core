import axios from "axios";

// Correct backend base URL (Traefik + SSL)
const API_BASE = "https://spiritlynk.asmglobal.cloud/api/v1";

const api = axios.create({
  baseURL: API_BASE,
});

// Attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
