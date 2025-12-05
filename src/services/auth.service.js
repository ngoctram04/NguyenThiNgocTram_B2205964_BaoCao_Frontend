import API from "./api.server.js";

export const login = async (MSNV, Password) => {
  try {
    const res = await API.post("/auth/login", { MSNV, Password });
    const { token, user } = res.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    return { token, user };
  } catch (err) {
    throw err.response?.data || { message: "Đăng nhập thất bại" };
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login";
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user") || "null");
};

export const isAdmin = () => {
  const user = getCurrentUser();
  return user?.Chucvu?.toLowerCase() === "admin";
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};
