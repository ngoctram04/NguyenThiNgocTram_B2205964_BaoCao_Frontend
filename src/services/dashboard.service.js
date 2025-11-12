import API from "./api.server.js";

const DashboardService = {
  async getTotalBooks() {
    try {
      const res = await API.get("/books");
      return res.data.length || 0;
    } catch (err) {
      console.error("Lỗi getTotalBooks:", err);
      return 0;
    }
  },

  async getTotalPublishers() {
    try {
      const res = await API.get("/publishers");
      return res.data.length || 0;
    } catch (err) {
      console.error("Lỗi getTotalPublishers:", err);
      return 0;
    }
  },

  async getTotalStaffs() {
    try {
      const res = await API.get("/staffs/count"); // giữ nguyên nếu backend đã có
      return res.data.count || 0;
    } catch (err) {
      console.error("Lỗi getTotalStaffs:", err);
      return 0;
    }
  },

  // --- Cập nhật lấy tổng độc giả
  async getTotalReaders() {
    try {
      // Lấy toàn bộ độc giả từ API hiện tại
      const res = await API.get("/readers");
      if (Array.isArray(res.data)) {
        return res.data.length; // đếm số lượng độc giả
      }
      return 0;
    } catch (err) {
      console.error("Lỗi getTotalReaders:", err);
      return 0;
    }
  },
};

export default DashboardService;
