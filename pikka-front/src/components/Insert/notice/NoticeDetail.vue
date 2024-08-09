<template>
  <div class="notice-detail">
    <h1 class="title">{{ isEditing ? '공지사항 수정' : '공지사항 등록' }}</h1>
    <form @submit.prevent="saveNotice" class="notice-form">
      <div class="form-group">
        <label for="title">제목</label>
        <input type="text" id="title" v-model="notice.notiTitle" required>
      </div>
      <div class="form-group">
        <label for="content">내용</label>
        <textarea id="content" v-model="notice.notiContents" rows="6" required></textarea>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="startDate">공지 시작 날짜</label>
          <input type="date" id="startDate" v-model="notice.notiStartDate" required>
        </div>
        <div class="form-group">
          <label for="endDate">공지 종료 날짜</label>
          <input type="date" id="endDate" v-model="notice.notiCloseDate" required>
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
        notiId: '',
        notiAdminId: '',
        notiAdminName: '',
        notiTitle: '',
        notiContents: '',
        notiStartDate: '',
        notiCloseDate: '',
        isPublic: true,
      },
      isEditing: false
    };
  },
  created() {
    this.isEditing = this.id !== undefined && this.id !== 'new';
    if (this.isEditing) {
      this.loadNotice();
    } else {
      const today = new Date().toISOString().split('T')[0];
      this.notice.notiStartDate = today;
      this.notice.notiCloseDate = today;
    }
  },
  methods: {
    async loadNotice() {
      try {
        const response = await axios.get(`http://localhost:8083/api/notice/${this.id}`);
        this.notice = response.data;
        
        // 날짜 형식 조정 (YYYY-MM-DD)
        this.notice.notiStartDate = this.formatDate(this.notice.notiStartDate);
        this.notice.notiCloseDate = this.formatDate(this.notice.notiCloseDate);
      } catch (error) {
        console.error('공지사항을 불러오는데 실패했습니다:', error);
        alert('공지사항을 불러오는데 실패했습니다.');
      }
    },
    
    formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];
    },

    async saveNotice() {
      try {
        const url = this.isEditing 
          ? `http://localhost:8083/api/notice/${this.notice.notiId}` 
          : 'http://localhost:8083/api/notice';
        const method = this.isEditing ? 'put' : 'post';

        console.log('Sending request to URL:', url);
        console.log('Request method:', method);
        console.log('Request data:', this.notice);

        const response = await axios({
          method,
          url,
          data: this.notice
        });

        console.log('Server response:', response.data);

        this.$router.push({ name: 'NoticeList' });
      } catch (error) {
        let errorMessage = '공지사항 저장에 실패했습니다. 자세한 내용은 콘솔을 확인해주세요.';
        
        if (error.response) {
          const status = error.response.status;
          const message = error.response.data.message || error.message;

          switch (status) {
            case 400:
              errorMessage = '잘못된 요청입니다. 입력값을 확인해주세요.';
              break;
            case 401:
              errorMessage = '인증 오류가 발생했습니다. 다시 로그인 해주세요.';
              break;
            case 403:
              errorMessage = '권한이 없습니다.';
              break;
            case 404:
              errorMessage = '요청한 리소스를 찾을 수 없습니다.';
              break;
            case 500:
              errorMessage = '서버 오류가 발생했습니다. 나중에 다시 시도해주세요.';
              break;
            default:
              errorMessage = `오류가 발생했습니다: ${message}`;
          }
          
          console.error('Server error:', message);
        } else if (error.request) {
          console.error('No response received:', error.request);
        } else {
          console.error('Request setup error:', error.message);
        }
        
        alert(errorMessage);
      }
    },
    cancel() {
      this.$router.push({ name: 'NoticeList' });
    }
  }
}
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