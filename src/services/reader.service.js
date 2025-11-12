// src/services/reader.service.js
import axios from "axios";

const API_URL = "http://localhost:3000/api/readers";

/**
 * Lấy toàn bộ độc giả
 * Trả về mảng độc giả [{ MaDocGia, HoLot, Ten, NgaySinh, Phai, DiaChi, DienThoai }]
 */
export const getReaders = async () => {
  const { data } = await axios.get(API_URL);
  // data phải là mảng độc giả từ backend
  return data;
};

/**
 * Lấy thông tin một độc giả theo ID
 */
export const getReaderById = async (id) => {
  const { data } = await axios.get(`${API_URL}/${id}`);
  return data;
};

/**
 * Thêm độc giả mới
 */
export const addReader = async (reader) => {
  const { data } = await axios.post(API_URL, reader);
  return data;
};

/**
 * Cập nhật thông tin độc giả
 */
export const updateReader = async (id, reader) => {
  const { data } = await axios.put(`${API_URL}/${id}`, reader);
  return data;
};

/**
 * Xóa độc giả
 */
export const deleteReader = async (id) => {
  const { data } = await axios.delete(`${API_URL}/${id}`);
  return data;
};

export default {
  getReaders,
  getReaderById,
  addReader,
  updateReader,
  deleteReader,
};
