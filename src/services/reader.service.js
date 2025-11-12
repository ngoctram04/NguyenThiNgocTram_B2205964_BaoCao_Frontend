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
  return await axios.post(API_URL, reader);
};

export const updateReader = async (id, reader) => {
  return await axios.put(`${API_URL}/${id}`, reader);
};

export const deleteReader = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};
