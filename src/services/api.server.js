import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  (config) => {
    if (config.headers["Authorization"]) return config;
    const adminToken = localStorage.getItem("token");
    if (adminToken) {
      config.headers["Authorization"] = `Bearer ${adminToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,

  (error) => {
    const status = error.response?.status;
    const data = error.response?.data || {};
    const code = data.code;
    if (!status) return Promise.reject(error);

    if (status === 401 && (code === "TOKEN_EXPIRED" || code === "INVALID_TOKEN")) {
      const url = error.config?.url || "";

      if (url.startsWith("/readers") || url.startsWith("/borrows")) {
        localStorage.removeItem("reader_token");
        localStorage.removeItem("reader_info");
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }

      window.location.href = "/login";

      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default API;
