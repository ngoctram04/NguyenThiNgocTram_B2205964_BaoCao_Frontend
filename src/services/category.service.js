import API from "./api.server.js";

export default {
  async getAll() {
    try {
      const categories = await API.get("/categories");
      return categories.data;
    } catch (err) {
      console.error("Lỗi getAll categories:", err);
      throw new Error(err.response?.data?.message || err.message);
    }
  },

  async getById(id) {
    try {
      const category = await API.get(`/categories/${id}`);
      return category.data;
    } catch (err) {
      console.error(`Lỗi getById category ${id}:`, err);
      throw new Error(err.response?.data?.message || err.message);
    }
  },

  async create(data) {
    try {
      const category = await API.post("/categories", data);
      return category.data;
    } catch (err) {
      console.error("Lỗi create category:", err);
      throw new Error(err.response?.data?.message || err.message);
    }
  },

  async update(id, data) {
    try {
      const category = await API.put(`/categories/${id}`, data);
      return category.data;
    } catch (err) {
      console.error(`Lỗi update category ${id}:`, err);
      throw new Error(err.response?.data?.message || err.message);
    }
  },

  async delete(id) {
    try {
      const res = await API.delete(`/categories/${id}`);
      return res.data;
    } catch (err) {
      console.error(`Lỗi delete category ${id}:`, err);
      throw new Error(err.response?.data?.message || err.message);
    }
  },
};
