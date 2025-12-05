import API from "./api.server.js";

const getToken = () => localStorage.getItem("token") || "";

const authHeaders = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

export const getStaffs = async () => {
  try {
    const res = await API.get("/staffs", authHeaders());
    return res.data;
  } catch (err) {
    console.error("getStaffs error:", err);
    throw err.response?.data || { message: "Lấy danh sách nhân viên thất bại" };
  }
};

export const createStaff = async (data) => {
  if (!data.MSNV || !data.HoTenNV || !data.Password || !data.Chucvu) {
    throw { message: "MSNV, Họ tên, Mật khẩu và Chức vụ là bắt buộc" };
  }

  try {
    const res = await API.post("/staffs", data, authHeaders());
    return res.data;
  } catch (err) {
    console.error("createStaff error:", err);
    throw err.response?.data || { message: "Tạo nhân viên thất bại" };
  }
};

export const updateStaff = async (id, data) => {
  if (!id) throw { message: "ID nhân viên không được để trống" };

  try {
    const res = await API.put(`/staffs/${id}`, data, authHeaders());
    return res.data;
  } catch (err) {
    console.error("updateStaff error:", err);
    throw err.response?.data || { message: "Cập nhật nhân viên thất bại" };
  }
};

export const deleteStaff = async (id) => {
  if (!id) throw { message: "ID nhân viên không được để trống" };
  if (id === "AD001") throw { message: "Không được xóa admin mặc định" };

  try {
    const res = await API.delete(`/staffs/${id}`, authHeaders());
    return res.data;
  } catch (err) {
    console.error("deleteStaff error:", err);
    throw err.response?.data || { message: "Xóa nhân viên thất bại" };
  }
};
