<template>
  <div class="notice-view" v-if="notice">
    <h2>{{ notice.notiTitle }}</h2>
    <div class="notice-info">
      <p>작성자: {{ notice.notiAdminName || "관리자" }}</p>
      <p>등록일: {{ formatDate(notice.notiCreateAt) }}</p>
      <p>공지기간: {{ formatDate(notice.notiStartDate) }} - {{ formatDate(notice.notiCloseDate) || "미정" }}</p>
    </div>
    <div class="notice-content">
      <p>{{ notice.notiContents }}</p>
    </div>
    <div class="notice-actions">
      <router-link :to="{ name: 'NoticeList' }" class="back-button">목록으로</router-link>
      <button @click="editNotice" class="edit-button">수정</button>
      <button @click="deleteNotice" class="delete-button">삭제</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'NoticeView',
  data() {
    return {
      notice: null
    };
  },
  created() {
    this.loadNotice();
  },
  methods: {
    async loadNotice() {
      try {
        const response = await axios.get(`http://localhost:8083/api/notice/${this.$route.params.id}`);
        this.notice = response.data;
      } catch (error) {
        console.error('공지사항을 불러오는데 실패했습니다:', error);
        alert('공지사항을 불러오는데 실패했습니다.');
      }
    },
    formatDate(dateString) {
      if (!dateString) return '';
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('ko-KR', options);
    },
    editNotice() {
      this.$router.push({ name: 'NoticeEdit', params: { id: this.notice.notiId.toString() } });
    },
    async deleteNotice() {
      if (confirm('정말로 삭제하시겠습니까?')) {
        try {
          await axios.delete(`http://localhost:8083/api/notice/${this.notice.notiId}`);
          this.$router.push({ name: 'NoticeList' });
          alert('공지사항이 성공적으로 삭제되었습니다.');
        } catch (error) {
          console.error('공지사항 삭제 중 오류 발생:', error);
          alert('공지사항 삭제에 실패했습니다.');
        }
      }
    }
  }
};
</script>

<style scoped>
.notice-view {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.notice-info {
  margin-bottom: 1rem;
  color: #666;
}

.notice-content {
  margin-bottom: 2rem;
  line-height: 1.6;
}

.notice-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.back-button, .edit-button, .delete-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background-color 0.3s ease;
}

.back-button {
  background-color: #f0f0f0;
  color: #333;
  text-decoration: none;
}

.edit-button {
  background-color: #4CAF50;
  color: white;
}

.delete-button {
  background-color: #f44336;
  color: white;
}

button:hover, .back-button:hover {
  opacity: 0.9;
}
</style>