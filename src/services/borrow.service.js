import api from "./api.server.js";

class BorrowService {
  borrow(data) {
    const token = localStorage.getItem("reader_token");
    if (!token) throw new Error("Chưa đăng nhập độc giả");

    return api.post("/borrows", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  getMyBorrows() {
    const token = localStorage.getItem("reader_token");
    if (!token) throw new Error("Chưa đăng nhập độc giả");

    return api.get("/borrows/my", {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  getAll() {
    return api.get("/borrows");
  }

  approve(MaPhieu) {
    return api.put(`/borrows/${MaPhieu}/approve`);
  }

  returnBook(MaPhieu) {
    return api.put(`/borrows/${MaPhieu}/returned`);
  }

  reject(MaPhieu) {
    return api.put(`/borrows/${MaPhieu}/reject`);
  }

  delete(MaPhieu) {
    return api.delete(`/borrows/${MaPhieu}`);
  }

  calculateFine(MaPhieu) {
    return api.get(`/borrows/${MaPhieu}/fine`);
  }
}

export default new BorrowService();
