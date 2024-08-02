<template>
  <div class="notice-detail">
    <h1 class="title">{{ isEditing ? '공지사항 수정' : '공지사항 등록' }}</h1>
    <form @submit.prevent="saveNotice" class="notice-form">
      <div class="form-group">
        <label for="title">제목</label>
        <input type="text" id="title" v-model="notice.title" required>
      </div>
      <div class="form-group">
        <label for="content">내용</label>
        <textarea id="content" v-model="notice.content" rows="6" required></textarea>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="startDate">공지 시작 날짜</label>
          <input type="date" id="startDate" v-model="notice.date" required>
        </div>
        <div class="form-group">
          <label for="endDate">공지 종료 날짜</label>
          <input type="date" id="endDate" v-model="notice.endDate" required>
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
export default {
  name: 'NoticeDetail',
  props: ['id'],
  data() {
    return {
      notice: {
        title: '',
        content: '',
        date: '',
        endDate: '',
        isPublic: true,
        author: '관리자'
      },
      isEditing: false
    };
  },
  created() {
    this.isEditing = this.id !== undefined && this.id !== 'new';
    if (this.isEditing) {
      this.loadNotice();
    } else {
      this.notice.date = new Date().toISOString().split('T')[0];
    }
  },
  methods: {
    loadNotice() {
      const notices = JSON.parse(localStorage.getItem('notices') || '[]');
      const notice = notices.find(n => n.id === parseInt(this.id));
      if (notice) {
        this.notice = { ...notice };
      } else {
        this.$router.push({ name: 'NoticeList' });
      }
    },
    saveNotice() {
      const notices = JSON.parse(localStorage.getItem('notices') || '[]');
      if (this.isEditing) {
        const index = notices.findIndex(n => n.id === parseInt(this.id));
        if (index !== -1) {
          notices[index] = { ...this.notice };
        }
      } else {
        const newNotice = {
          ...this.notice,
          id: Date.now(),
          author: '관리자' // 실제 구현 시 로그인한 사용자 정보를 사용
        };
        notices.push(newNotice);
      }
      localStorage.setItem('notices', JSON.stringify(notices));
      this.$router.push({ name: 'NoticeList' });
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