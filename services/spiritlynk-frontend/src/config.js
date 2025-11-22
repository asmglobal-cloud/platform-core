// config.js

// Automatically detect correct base URL
const API_BASE_URL = window.location.hostname.includes("localhost")
  ? "http://localhost:3050/api/v1"
  : "https://spiritlynk.asmglobal.cloud/api/v1";

export default API_BASE_URL;
