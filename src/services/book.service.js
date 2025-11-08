import API from "./api.server.js";

/**
 * Lấy danh sách tất cả sách
 * @returns {Array} mảng sách
 */
export const getBooks = async () => {
  try {
    const res = await API.get("/books");
    return res.data;
  } catch (err) {
    console.error("getBooks error:", err);
    throw err.response?.data || { message: "Lấy danh sách sách thất bại" };
  }
};

/**
 * Tạo sách mới
 * @param {Object|FormData} data - thông tin sách, có thể kèm file
 * @returns {Object} sách vừa tạo
 */
export const createBook = async (data) => {
  try {
    const isFormData = data instanceof FormData;
    const res = await API.post("/books", data, {
      headers: isFormData
        ? { "Content-Type": "multipart/form-data" }
        : { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (err) {
    console.error("createBook error:", err);
    throw err.response?.data || { message: "Tạo sách thất bại" };
  }
};

/**
 * Cập nhật sách
 * @param {string} id - ID sách
 * @param {Object|FormData} data - thông tin cần cập nhật, có thể kèm file
 * @returns {Object} sách vừa cập nhật
 */
export const updateBook = async (id, data) => {
  try {
    const isFormData = data instanceof FormData;
    const res = await API.put(`/books/${id}`, data, {
      headers: isFormData
        ? { "Content-Type": "multipart/form-data" }
        : { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (err) {
    console.error("updateBook error:", err);
    throw err.response?.data || { message: "Cập nhật sách thất bại" };
  }
};

/**
 * Xóa sách
 * @param {string} id - ID sách
 * @returns {Object} kết quả xóa
 */
export const deleteBook = async (id) => {
  try {
    const res = await API.delete(`/books/${id}`);
    return res.data;
  } catch (err) {
    console.error("deleteBook error:", err);
    throw err.response?.data || { message: "Xóa sách thất bại" };
  }
};
