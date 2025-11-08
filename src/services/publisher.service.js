import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default {
  getAll() {
    return API.get("/publishers");
  },

  getById(id) {
    return API.get(`/publishers/${id}`);
  },

  create(data) {
    return API.post("/publishers", data);
  },

  update(id, data) {
    return API.put(`/publishers/${id}`, data);
  },

  delete(id) {
    return API.delete(`/publishers/${id}`);
  },
};
