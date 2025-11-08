import API from "./api.server.js";

/**
 * Đăng nhập
 * @param {string} MSNV 
 * @param {string} Password 
 * @returns {object} { token, user }
 */
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

/**
 * Lấy thông tin user hiện tại
 * @returns {object|null} user hoặc null nếu chưa login
 */
export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user") || "null");
};

/**
 * Kiểm tra user hiện tại có phải admin không
 * @returns {boolean}
 */
export const isAdmin = () => {
  const user = getCurrentUser();
  return user?.Chucvu?.toLowerCase() === "admin";
};

/**
 * Kiểm tra user đã login chưa
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};
