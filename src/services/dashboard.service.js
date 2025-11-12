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
      const res = await API.get("/staffs/count"); // chỉ lấy count
      return res.data.count || 0;
    } catch (err) {
      console.error("Lỗi getTotalStaffs:", err);
      return 0;
    }
  },

  async getTotalReaders() {
    try {
      const res = await API.get("/readers/count"); // chỉ lấy count
      return res.data.count || 0;
    } catch (err) {
      console.error("Lỗi getTotalReaders:", err);
      return 0;
    }
  },
};

export default DashboardService;
