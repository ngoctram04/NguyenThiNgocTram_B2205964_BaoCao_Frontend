import axios from "axios";

const API_URL = "http://localhost:3000/api/readers";

export const getReaders = async () => {
  const { data } = await axios.get(API_URL);
  return data;
};

export const getReaderById = async (id) => {
  const { data } = await axios.get(`${API_URL}/${id}`);
  return data;
};

export const addReader = async (reader) => {
  const { data } = await axios.post(API_URL, reader);
  return data;
};

export const updateReader = async (id, reader) => {
  const { data } = await axios.put(`${API_URL}/${id}`, reader);
  return data;
};

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
