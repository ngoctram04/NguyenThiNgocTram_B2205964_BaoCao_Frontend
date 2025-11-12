import api from "./api.server.js";

const READER_TOKEN_KEY = "reader_token";
const READER_INFO_KEY = "reader_info";

export const registerReader = async (data) => {
  const res = await api.post("/readers/register", data);
  return res.data;
};

export const loginReader = async (data) => {
  const res = await api.post("/readers/login", data);
  if (res.data.token) {
    localStorage.setItem(READER_TOKEN_KEY, res.data.token);
    localStorage.setItem(READER_INFO_KEY, JSON.stringify(res.data.reader));
  }
  return res.data;
};

export const logoutReader = () => {
  localStorage.removeItem(READER_TOKEN_KEY);
  localStorage.removeItem(READER_INFO_KEY);
};

export const getReaderToken = () => localStorage.getItem(READER_TOKEN_KEY);

export const getReaderInfo = () => {
  const info = localStorage.getItem(READER_INFO_KEY);
  return info ? JSON.parse(info) : null;
};

export default {
  registerReader,
  loginReader,
  logoutReader,
  getReaderToken,
  getReaderInfo
};
