<template>
  <div class="borrow-history">
    <h2>Lịch sử mượn sách</h2>

    <div v-if="loading" class="loading">Đang tải...</div>
    <div v-else>
      <div v-if="borrowList.length > 0" class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Mã phiếu</th>
              <th>Tên sách</th>
              <th>Ngày mượn</th>
              <th>Ngày trả dự kiến</th>
              <th>Ngày trả thực tế</th>
              <th>Nhân viên duyệt</th>
              <th>Trạng thái</th>
              <th>Tiền phạt</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="borrow in borrowList" :key="borrow.MaPhieu" class="row-hover">
              <td class="center">{{ borrow.MaPhieu }}</td>
              <td>{{ borrow.TenSach || borrow.MaSach }}</td>
              <td class="center">{{ formatDate(borrow.NgayMuon) }}</td>
              <td class="center">{{ formatDate(borrow.NgayTraDuKien) }}</td>
              <td class="center">{{ borrow.NgayTraThucTe ? formatDate(borrow.NgayTraThucTe) : '-' }}</td>
              <td>{{ borrow.NhanVienDuyet || '-' }}</td>
              <td class="center">
                <span :class="['status-badge', statusClass(borrow.TrangThai)]">
                  {{ statusText(borrow.TrangThai) }}
                </span>
              </td>
              <td class="center">
                <span :class="{'late-fee': borrow.TienPhat > 0}">
                  {{ formatMoney(borrow.TienPhat) }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-else class="empty">Bạn chưa mượn sách nào.</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import borrowService from "../../services/borrow.service.js";

const borrowList = ref([]);
const loading = ref(true);

const statusText = (status) => {
  switch (status) {
    case 1: return "Chờ duyệt";
    case 2: return "Đang mượn";
    case 3: return "Đã trả";
    case 4: return "Bị từ chối / Hủy";
    default: return "Unknown";
  }
};

const statusClass = (status) => {
  switch (status) {
    case 1: return "pending";
    case 2: return "active";
    case 3: return "returned";
    case 4: return "rejected";
    default: return "";
  }
};

const formatDate = (dateStr) => {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  return isNaN(d) ? "-" : d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
};

const formatMoney = (value) => {
  if (!value) return "0₫";
  return value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
};

const loadBorrowHistory = async () => {
  loading.value = true;
  try {
    const res = await borrowService.getMyBorrows();
    borrowList.value = (res.data || [])
      .map(b => ({
        ...b,
        TenSach: b.TenSach || b.MaSach,
        NhanVienDuyet: b.NhanVienDuyet || "-",
        TienPhat: b.TienPhat || 0
      }))
      .sort((a, b) => new Date(b.NgayMuon) - new Date(a.NgayMuon));
  } catch (err) {
    console.error("Lấy lịch sử mượn lỗi:", err);
    borrowList.value = [];
  } finally {
    loading.value = false;
  }
};

onMounted(loadBorrowHistory);
</script>

<style scoped>
.borrow-history {
  background-color: #fff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.08);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

h2 {
  margin-bottom: 1.5rem;
  font-size: 1.7rem;
  font-weight: 600;
  color: #111;
}

.table-wrapper {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 800px;
}

th, td {
  border: 1px solid #e0e0e0;
  padding: 0.75rem 1rem;
  font-size: 0.95rem;
}

th {
  background-color: #f3f4f6;
  color: #333;
  text-align: center;
  font-weight: 600;
}

td.center {
  text-align: center;
}

tbody tr.row-hover:hover {
  background-color: #f9fafb;
  transition: background-color 0.2s;
}

.loading, .empty {
  text-align: center;
  color: #888;
  padding: 1rem 0;
  font-style: italic;
}

.status-badge {
  padding: 3px 8px;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
  display: inline-block;
}
.status-badge.pending { background-color: #fef3c7; color: #b45309; }
.status-badge.active { background-color: #dbeafe; color: #1e40af; }
.status-badge.returned { background-color: #d1fae5; color: #047857; }
.status-badge.rejected { background-color: #fee2e2; color: #b91c1c; }

.late-fee {
  color: #b91c1c;
  font-weight: 600;
}
@media (max-width: 768px) {
  table { font-size: 0.85rem; min-width: 600px; }
  th, td { padding: 0.5rem 0.75rem; }
}
</style>
