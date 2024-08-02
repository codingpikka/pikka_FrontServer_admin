<template>
    <div class="notice-view" v-if="notice">
      <div class="content">
        <h1 class="title">{{ notice.title }}</h1>
        <div class="meta-info">
          <div class="info-item">
            <span class="label">작성자</span>
            <span class="value">{{ notice.author || "관리자" }}</span>
          </div>
          <div class="info-item">
            <span class="label">등록일</span>
            <span class="value">{{ formatDate(notice.date) }}</span>
          </div>
          <div class="info-item">
            <span class="label">상태</span>
            <span class="value status" :class="{ 'public': notice.isPublic !== false }">
              {{ notice.isPublic !== false ? "공개" : "비공개" }}
            </span>
          </div>
        </div>
        <div class="notice-content">
          <p>{{ notice.content }}</p>
        </div>
        <div class="additional-info">
          <span class="label">공지 종료일</span>
          <span class="value">{{ formatDate(notice.endDate) || "미정" }}</span>
        </div>
        <div class="action-buttons">
          <router-link :to="{ name: 'NoticeList' }" class="btn btn-secondary">목록으로</router-link>
          <router-link :to="{ name: 'NoticeEdit', params: { id: notice.id } }" class="btn btn-primary">수정하기</router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NoticeView',
    props: ['id'],
    data() {
      return {
        notice: null
      };
    },
    created() {
      this.loadNotice();
    },
    methods: {
      loadNotice() {
        const notices = JSON.parse(localStorage.getItem('notices') || '[]');
        this.notice = notices.find(n => n.id === parseInt(this.id));
        if (!this.notice) {
          this.$router.push({ name: 'NoticeList' });
        }
      },
      formatDate(dateString) {
        if (!dateString) return '';
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('ko-KR', options);
      }
    }
  };
  </script>
  
  <style scoped>
  .notice-view {
    max-width: 800px;
    margin: 2rem auto;
    background-color: #ffffff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  }
  
  .content {
    padding: 2rem;
  }
  
  .title {
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 1.5rem;
    border-bottom: 1px solid #eaeaea;
    padding-bottom: 0.5rem;
  }
  
  .meta-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
    padding: 1rem;
    background-color: #f9f9f9;
    border: 1px solid #eaeaea;
    border-radius: 4px;
  }
  
  .info-item {
    display: flex;
    flex-direction: column;
  }
  
  .label {
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 0.25rem;
  }
  
  .value {
    font-size: 1rem;
    color: #333;
    font-weight: 500;
  }
  
  .status {
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-weight: 500;
  }
  
  .status.public {
    background-color: #e8f5e9;
    color: #2e7d32;
  }
  
  .notice-content {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #444;
    margin: 2rem 0;
    padding: 1.5rem;
    background-color: #ffffff;
    border: 1px solid #eaeaea;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }
  
  .additional-info {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 2rem;
    padding: 1rem;
    background-color: #f9f9f9;
    border: 1px solid #eaeaea;
    border-radius: 4px;
  }
  
  .additional-info .label {
    margin-right: 1rem;
  }
  
  .action-buttons {
    display: flex;
    justify-content: flex-end;
    margin-top: 2rem;
  }
  
  .btn {
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.3s ease;
    border: 1px solid transparent;
  }
  
  .btn-primary {
    background-color: #1976d2;
    color: white;
    margin-left: 1rem;
  }
  
  .btn-secondary {
    background-color: #f5f5f5;
    color: #333;
    border-color: #ddd;
  }
  
  .btn:hover {
    opacity: 0.9;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  </style>