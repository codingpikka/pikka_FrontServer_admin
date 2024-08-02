<template>
  <div class="notice-container">
    <div class="header">
      <h2>공지사항</h2>
      <router-link :to="{ name: 'NoticeCreate' }" class="add-button">공지사항 등록</router-link>
    </div>
    <table>
      <thead>
        <tr>
          <th>NO</th>
          <th>제목</th>
          <th>등록자</th>
          <th>등록일자</th>
          <th>공지날짜</th>
          <th>공지상태</th>
          <th>관리</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="!notices || notices.length === 0">
          <td colspan="7">공지사항이 없습니다.</td>
        </tr>
        <tr v-else v-for="(notice, index) in notices" :key="notice.id">
          <td>{{ index + 1 }}</td>
          <td>
            <router-link :to="{ name: 'NoticeView', params: { id: notice.id } }">
              {{ notice.title }}
            </router-link>
          </td>
          <td>{{ notice.author || "관리자" }}</td>
          <td>{{ notice.date }}</td>
          <td>{{ notice.endDate || "-" }}</td>
          <td>{{ notice.isPublic !== false ? "공지중" : "종료" }}</td>
          <td>
            <button @click="editNotice(notice.id)" class="edit-button">수정</button>
            <button @click="deleteNotice(notice.id)" class="delete-button">삭제</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'NoticeList',
  data() {
    return {
      notices: []
    };
  },
  created() {
    this.loadNotices();
  },
  methods: {
    loadNotices() {
      const savedNotices = localStorage.getItem('notices');
      if (savedNotices) {
        this.notices = JSON.parse(savedNotices);
      }
    },
    editNotice(id) {
      this.$router.push({ name: 'NoticeEdit', params: { id: id.toString() } });
    },
    deleteNotice(id) {
      if (confirm('정말로 이 공지사항을 삭제하시겠습니까?')) {
        this.notices = this.notices.filter(notice => notice.id !== id);
        this.saveNotices();
      }
    },
    saveNotices() {
      localStorage.setItem('notices', JSON.stringify(this.notices));
    }
  }
};
</script>

<style scoped>
.notice-container {
  padding: 20px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
th {
  background-color: #f2f2f2;
}
tr:nth-child(even) {
  background-color: #f9f9f9;
}
tr:hover {
  background-color: #f1f1f1;
}
.add-button, .edit-button, .delete-button {
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}
.add-button {
  background-color: #4CAF50;
  color: white;
  text-decoration: none;
}
.edit-button {
  background-color: #2196F3;
  color: white;
  margin-right: 5px;
}
.delete-button {
  background-color: #f44336;
  color: white;
}
.add-button:hover {
  background-color: #45a049;
}
.edit-button:hover {
  background-color: #0b7dda;
}
.delete-button:hover {
  background-color: #da190b;
}
</style>