import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/admin/staffs",
  headers: { "Content-Type": "application/json" },
});

export default {
  login(payload) {
    return api.post("/login", payload);
  },
  getAll() {
    return api.get("/");
  },
  create(payload) {
    return api.post("/", payload);
  },
};
