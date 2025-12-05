import API from "./api.server.js";

const DashboardService = {
  async getTotalBooks() {
    try {
      const res = await API.get("/books");
      return Array.isArray(res.data) ? res.data.length : 0;
    } catch (err) {
      console.error("Lỗi getTotalBooks:", err);
      return 0;
    }
  },

  async getTotalPublishers() {
    try {
      const res = await API.get("/publishers");
      return Array.isArray(res.data) ? res.data.length : 0;
    } catch (err) {
      console.error("Lỗi getTotalPublishers:", err);
      return 0;
    }
  },

  async getTotalStaffs() {
    try {
      const res = await API.get("/staffs/count");
      return res.data.count || 0;
    } catch (err) {
      console.error("Lỗi getTotalStaffs:", err);
      return 0;
    }
  },

  async getTotalReaders() {
    try {
      const res = await API.get("/readers");
      return Array.isArray(res.data) ? res.data.length : 0;
    } catch (err) {
      console.error("Lỗi getTotalReaders:", err);
      return 0;
    }
  },
  async getBooksStatsByMonthYear(month, year) {
    try {
      const res = await API.get("/borrows/stats", {
        params: { month, year }
      });
      const data = res.data || {};
      return {
        borrowed: data.borrowed || 0,
        returned: data.returned || 0,
        late: data.late || 0,
        fined: data.fined || 0
      };
    } catch (err) {
      console.error("Lỗi getBooksStatsByMonthYear:", err);
      return { borrowed: 0, returned: 0, late: 0, fined: 0 };
    }
  },
  parseDate(dateObj) {
    if (!dateObj) return null;
    const dateStr = dateObj.$date ? dateObj.$date : dateObj;
    return new Date(dateStr);
  }
};

export default DashboardService;
