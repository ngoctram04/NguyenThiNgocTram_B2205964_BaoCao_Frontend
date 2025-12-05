<template>
  <AdminLayout>
    <div class="borrow-list">
      <div class="header">
        <div class="search-filter">
          <input
            v-model="searchText"
            placeholder="Tìm phiếu / sách / độc giả..."
            class="search-input"
          />

          <select v-model="filterStatus" class="filter-select">
            <option value="">-- Trạng thái --</option>
            <option v-for="(label, key) in statusOptions" :key="key" :value="key">
              {{ label }}
            </option>
          </select>

          <input
            type="date"
            v-model="filterDate"
            class="filter-date"
            placeholder="Ngày mượn"
          />

          <select v-model="sortOrder" class="filter-select">
            <option value="desc">Mới nhất</option>
            <option value="asc">Cũ nhất</option>
          </select>
        </div>
      </div>

      <div v-if="loading" class="loading">Đang tải dữ liệu...</div>

      <div v-else class="table-container">
        <table>
          <thead>
            <tr>
              <th>Mã phiếu</th>
              <th>Sách</th>
              <th>Độc giả</th>
              <th>Ngày mượn</th>
              <th>Ngày dự kiến trả</th>
              <th>Ngày trả thực tế</th>
              <th>Trạng thái</th>
              <th>Nhân viên duyệt</th>
              <th>Tiền phạt</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="b in paginatedBorrows" :key="b.MaPhieu">
              <td>{{ b.MaPhieu }}</td>
              <td>{{ b.MaSach }}</td>
              <td>{{ b.MaDocGia }}</td>
              <td>{{ formatDate(b.NgayMuon) }}</td>
              <td>{{ formatDate(b.NgayTraDuKien) }}</td>
              <td>{{ formatDate(b.NgayTraThucTe) || "-" }}</td>
              <td>{{ parseStatus(b.TrangThai) }}</td>
              <td>{{ b.NhanVienDuyet || "-" }}</td>
              <td>{{ formatMoney(b.TienPhat) }}</td>
              <td>
                <button
                  v-if="b.TrangThai === 1"
                  class="btn approve"
                  @click="approveBorrow(b.MaPhieu)"
                >
                  Duyệt
                </button>

                <button
                  v-if="b.TrangThai === 2"
                  class="btn return"
                  @click="returnBorrow(b.MaPhieu)"
                >
                  Trả
                </button>

                <button
                  v-if="b.TrangThai === 1 || b.TrangThai === 2"
                  class="btn reject"
                  @click="rejectBorrow(b.MaPhieu)"
                >
                  Từ chối
                </button>

                <button class="btn delete" @click="deleteBorrow(b.MaPhieu)">
                  Xóa
                </button>
              </td>
            </tr>

            <tr v-if="paginatedBorrows.length === 0">
              <td colspan="10" class="empty">Không tìm thấy phiếu mượn</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="pagination" v-if="totalPages > 1">
        <button
          class="btn"
          :disabled="currentPage === 1"
          @click="currentPage--"
        >
          « Trước
        </button>
        <span>Trang {{ currentPage }} / {{ totalPages }}</span>
        <button
          class="btn"
          :disabled="currentPage === totalPages"
          @click="currentPage++"
        >
          Sau »
        </button>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import borrowService from "../../services/borrow.service.js";

const borrows = ref([]);
const loading = ref(true);

const searchText = ref("");
const filterStatus = ref("");
const filterDate = ref("");

const currentPage = ref(1);
const perPage = 8;

const sortOrder = ref("desc");

const statusOptions = {
  1: "Chờ duyệt",
  2: "Đang mượn",
  3: "Đã trả",
  4: "Từ chối / Hủy",
};

const fetchBorrows = async () => {
  loading.value = true;
  try {
    borrows.value = (await borrowService.getAll()).data;
  } catch (err) {
    alert(err.response?.data?.message || err.message);
  } finally {
    loading.value = false;
  }
};

const approveBorrow = async (MaPhieu) => {
  try {
    await borrowService.approve(MaPhieu);
    fetchBorrows();
  } catch (err) {
    alert(err.response?.data?.message || err.message);
  }
};

const returnBorrow = async (MaPhieu) => {
  try {
    await borrowService.returnBook(MaPhieu);
    fetchBorrows();
  } catch (err) {
    alert(err.response?.data?.message || err.message);
  }
};

const rejectBorrow = async (MaPhieu) => {
  try {
    await borrowService.reject(MaPhieu);
    fetchBorrows();
  } catch (err) {
    alert(err.response?.data?.message || err.message);
  }
};

const deleteBorrow = async (MaPhieu) => {
  if (!confirm("Bạn có chắc muốn xóa phiếu mượn này?")) return;
  try {
    await borrowService.delete(MaPhieu);
    fetchBorrows();
  } catch (err) {
    alert(err.response?.data?.message || err.message);
  }
};

const formatDate = (dateStr) =>
  dateStr ? new Date(dateStr).toLocaleDateString("vi-VN") : null;

const parseStatus = (status) => statusOptions[status] || status;

const formatMoney = (value) =>
  value ? value.toLocaleString("vi-VN", { style: "currency", currency: "VND" }) : "0₫";

const filteredBorrowsSorted = computed(() => {
  let result = borrows.value.filter((b) => {
    const searchMatch =
      b.MaPhieu.toString().includes(searchText.value) ||
      (b.TenSach || "").toLowerCase().includes(searchText.value.toLowerCase()) ||
      (b.MaDocGia || "").toLowerCase().includes(searchText.value.toLowerCase());

    const statusMatch = filterStatus.value ? b.TrangThai == filterStatus.value : true;
    const dateMatch = filterDate.value
      ? new Date(b.NgayMuon).toISOString().slice(0, 10) === filterDate.value
      : true;

    return searchMatch && statusMatch && dateMatch;
  });

  result.sort((a, b) => {
    return sortOrder.value === "desc"
      ? new Date(b.NgayMuon) - new Date(a.NgayMuon)
      : new Date(a.NgayMuon) - new Date(b.NgayMuon);
  });

  return result;
});

const totalPages = computed(() => Math.ceil(filteredBorrowsSorted.value.length / perPage));

const paginatedBorrows = computed(() => {
  const start = (currentPage.value - 1) * perPage;
  return filteredBorrowsSorted.value.slice(start, start + perPage);
});

watch(filteredBorrowsSorted, () => {
  if (currentPage.value > totalPages.value) currentPage.value = totalPages.value || 1;
});

onMounted(fetchBorrows);
</script>

<style scoped>
.borrow-list {
  background: #f9fafc;
  padding: 25px;
  border-radius: 12px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.search-filter {
  display: flex;
  gap: 8px;
  align-items: center;
}

.search-input,
.filter-select,
.filter-date {
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 0.9rem;
}

.filter-select { width: 150px; }
.filter-date { width: 140px; }

.table-container { overflow-x: auto; }
td:last-child {
  display: flex;
  flex-wrap: wrap;    
  gap: 6px;         
  align-items: center;
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 1000px;
}

th, td {
  padding: 12px 15px;
  border-bottom: 1px solid #e0e0e0;
  text-align: left;
}

th {
  background: #e3f2fd;
  color: #0d47a1;
  font-weight: 600;
}

tr:hover { background: #f1f5f9; }

.btn {
  padding: 6px 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  margin: 2px 0;
}

.btn.approve { background-color: #42a5f5; color: white; }
.btn.approve:hover { background-color: #1976d2; }

.btn.return { background-color: #66bb6a; color: white; }
.btn.return:hover { background-color: #388e3c; }

.btn.reject { background-color: #ffa726; color: white; }
.btn.reject:hover { background-color: #fb8c00; }

.btn.delete { background-color: #ef5350; color: white; }
.btn.delete:hover { background-color: #c62828; transform: translateY(-2px); }

.empty { text-align: center; color: #999; padding: 12px; }

.loading { text-align: center; padding: 20px; font-weight: 500; color: #1976d2; }

.pagination {
  margin-top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.pagination .btn {
  padding: 4px 12px;
  font-size: 0.9rem;
}
.pagination .btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.pagination .btn:hover:not(:disabled) {
  background-color: #2563eb;
}
</style>
