import API from "./api.server.js";

export const getBooks = async () => {
  try {
    const res = await API.get("/books");
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Lấy danh sách sách thất bại" };
  }
};

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
    throw err.response?.data || { message: "Tạo sách thất bại" };
  }
};

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
    throw err.response?.data || { message: "Cập nhật sách thất bại" };
  }
};

export const deleteBook = async (id) => {
  try {
    const res = await API.delete(`/books/${id}`);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Xóa sách thất bại" };
  }
};

export const getBook = async (id) => {
  try {
    const res = await API.get(`/books/${id}`);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Lấy chi tiết sách thất bại" };
  }
};

export const borrowBook = async (book) => {
  alert(`Bạn muốn mượn sách: ${book.TenSach}\nAPI chưa tích hợp`);
};
