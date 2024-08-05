<template>
  <div class="notice-detail">
    <h1 class="title">{{ isEditing ? '공지사항 수정' : '공지사항 등록' }}</h1>
    <form @submit.prevent="saveNotice" class="notice-form">
      <div class="form-group">
        <label for="title">제목</label>
        <input type="text" id="title" v-model="notice.noti_title" required>
      </div>
      <div class="form-group">
        <label for="content">내용</label>
        <textarea id="content" v-model="notice.noti_contents" rows="6" required></textarea>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="startDate">공지 시작 날짜</label>
          <input type="date" id="startDate" v-model="notice.noti_start_date" required>
        </div>
        <div class="form-group">
          <label for="endDate">공지 종료 날짜</label>
          <input type="date" id="endDate" v-model="notice.noti_close_date" required>
        </div>
      </div>
      <div class="form-group checkbox-group">
        <label for="isPublic" class="checkbox-label">
          <input type="checkbox" id="isPublic" v-model="notice.isPublic">
          <span class="checkbox-text">공개여부</span>
        </label>
      </div>
      <div class="form-actions">
        <button type="submit" class="btn btn-primary">{{ isEditing ? '수정하기' : '등록하기' }}</button>
        <button type="button" @click="cancel" class="btn btn-secondary">취소</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'NoticeDetail',
  props: ['id'],
  data() {
    return {
      notice: {
        noti_title: '',
        noti_contents: '',
        noti_start_date: '',
        noti_close_date: '',
        isPublic: true,
        admin_name: '관리자'
      },
      isEditing: false
    };
  },
  created() {
    this.isEditing = this.id !== undefined && this.id !== 'new';
    if (this.isEditing) {
      this.loadNotice();
    } else {
      this.notice.noti_start_date = new Date().toISOString().split('T')[0];
    }
  },
  methods: {
    async loadNotice() {
      try {
        const response = await axios.get(`/notice/${this.id}`);
        this.notice = response.data;
      } catch (error) {
        console.error('공지사항을 불러오는데 실패했습니다:', error);
        this.$router.push({ name: 'NoticeList' });
      }
    },
    async saveNotice() {
      try {
        const url = this.isEditing ? `/notice/${this.id}` : '/notice';
        const method = this.isEditing ? 'put' : 'post';
        const response = await axios({
          method: method,
          url: url,
          data: this.notice
        });
        console.log('서버 응답:', response.data);
        this.$router.push({ name: 'NoticeList' });
      } catch (error) {
        console.error('공지사항 저장 중 오류 발생:', error.response ? error.response.data : error.message);
        alert('공지사항 저장에 실패했습니다. 자세한 내용은 콘솔을 확인해주세요.');
      }
    },
    cancel() {
      this.$router.push({ name: 'NoticeList' });
    }
  }
};
</script>

<style scoped>
.notice-detail {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.title {
  font-size: 2rem;
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
}

.notice-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-row {
  display: flex;
  gap: 1rem;
}

.form-row .form-group {
  flex: 1;
}

label {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
}

input[type="text"],
input[type="date"],
textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

textarea {
  resize: vertical;
}

.checkbox-group {
  display: flex;
  align-items: center;
}

.checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.checkbox-text {
  margin-left: 0.5rem;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-primary {
  background-color: #4CAF50;
  color: white;
}

.btn-secondary {
  background-color: #f44336;
  color: white;
}

.btn:hover {
  opacity: 0.9;
}
</style>
