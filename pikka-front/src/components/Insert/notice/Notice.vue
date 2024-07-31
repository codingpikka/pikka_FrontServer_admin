<template>
    <div class="layout">
      <div class="content">
        <main class="main-content">
          <!-- 공지사항 목록 -->
          <div v-if="currentView === 'list'">
            <h2>공지사항</h2>
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
                <tr v-for="(notice, index) in notices" :key="notice.id">
                  <td>{{ index + 1 }}</td>
                  <td>
                    <a href="#" @click.prevent="viewNotice(notice)">{{ notice.title }}</a>
                  </td>
                  <td>{{ notice.author || "관리자" }}</td>
                  <td>{{ notice.date }}</td>
                  <td>{{ notice.endDate || "-" }}</td>
                  <td>{{ notice.isPublic !== false ? "공지중" : "종료" }}</td>
                  <td>
                    <button @click="editNotice(notice)">수정</button>
                    <button @click="deleteNotice(notice)">삭제</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <button class="add-button" @click="addNotice">공지사항 등록</button>
          </div>
  
          <!-- 공지사항 조회 -->
          <div v-else-if="currentView === 'view'">
            <h2>{{ currentNotice.title }}</h2>
            <p><strong>작성일:</strong> {{ currentNotice.date }}</p>
            <p><strong>작성자:</strong> {{ currentNotice.author || "관리자" }}</p>
            <p>
              <strong>공개여부:</strong>
              {{ currentNotice.isPublic !== false ? "공개" : "비공개" }}
            </p>
            <div v-html="currentNotice.content"></div>
            <button @click="currentView = 'list'">목록으로</button>
            <button @click="editNotice(currentNotice)">수정</button>
          </div>
  
          <!-- 공지사항 폼 -->
          <div v-else-if="currentView === 'form'" class="notice-form">
            <h2>{{ currentNotice.id ? "공지사항 수정" : "공지사항 등록" }}</h2>
            <form @submit.prevent="saveNotice">
              <div class="form-group">
                <label for="title">제목</label>
                <input type="text" id="title" v-model="currentNotice.title" required>
              </div>
              <div class="form-group">
                <label for="content">내용</label>
                <textarea id="content" v-model="currentNotice.content" rows="4" required></textarea>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label for="startDate">공지 시작 날짜:</label>
                  <input type="date" id="startDate" v-model="currentNotice.startDate" required>
                </div>
                <div class="form-group">
                  <label for="endDate">공지 종료 날짜:</label>
                  <input type="date" id="endDate" v-model="currentNotice.endDate" required>
                </div>
              </div>
              <div class="form-group checkbox-group">
                <label for="isPublic">
                  <input type="checkbox" id="isPublic" v-model="currentNotice.isPublic">
                  공개여부
                </label>
              </div>
              <div class="form-actions">
                <button type="submit">등록하기</button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  </template>
  
  <script>
  import { defineComponent, ref, onMounted, watch } from "vue";
  
  export default defineComponent({
    name: "NoticeManagement",
    setup() {
      const STORAGE_KEY = "notices";
      const currentView = ref("list");
      const notices = ref(JSON.parse(localStorage.getItem(STORAGE_KEY)) || []);
      const currentNotice = ref({ 
        title: "", 
        content: "", 
        isPublic: true,
        startDate: "",
        endDate: ""
      });
  
      const saveNoticesToLocalStorage = () => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(notices.value));
      };
  
      const saveNotice = () => {
        if (currentNotice.value.id) {
          const index = notices.value.findIndex(
            (notice) => notice.id === currentNotice.value.id
          );
          if (index !== -1) {
            notices.value[index] = { ...currentNotice.value };
          }
        } else {
          const newNotice = {
            ...currentNotice.value,
            id: notices.value.length + 1,
            date: new Date().toISOString().split("T")[0],
            author: "관리자", // 실제 구현 시 로그인한 사용자 정보를 사용
          };
          notices.value.push(newNotice);
        }
        currentView.value = "list";
        currentNotice.value = { title: "", content: "", isPublic: true, startDate: "", endDate: "" };
        saveNoticesToLocalStorage();
      };
  
      const deleteNotice = (notice) => {
        if (confirm("정말로 이 공지사항을 삭제하시겠습니까?")) {
          notices.value = notices.value.filter((n) => n.id !== notice.id);
          saveNoticesToLocalStorage();
        }
      };
  
      const editNotice = (notice) => {
        currentNotice.value = { ...notice };
        currentView.value = "form";
      };
  
      const addNotice = () => {
        currentNotice.value = { title: "", content: "", isPublic: true, startDate: "", endDate: "" };
        currentView.value = "form";
      };
  
      const viewNotice = (notice) => {
        currentNotice.value = { ...notice };
        currentView.value = "view";
      };
  
      onMounted(() => {
        const savedNotices = localStorage.getItem(STORAGE_KEY);
        if (savedNotices) {
          notices.value = JSON.parse(savedNotices);
        }
      });
  
      watch(notices, saveNoticesToLocalStorage, { deep: true });
  
      return {
        currentView,
        notices,
        currentNotice,
        saveNotice,
        deleteNotice,
        editNotice,
        addNotice,
        viewNotice,
      };
    },
  });
  </script>
  
  <style>
  @font-face {
    font-family: 'HSSanTokki20-Regular';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2405@1.0/HSSanTokki20-Regular.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  
  body {
    font-family: 'HSSanTokki20-Regular', sans-serif;
    /* background-color: #f0f0f0; */
    margin: 0;
    padding: 1;
  }
  
  .layout {
  width: 100%;
  display: flex;
  flex-direction: column; /* 세로 방향으로 변경 */
  align-items: stretch; /* 자식 요소들을 늘려서 채우도록 설정 */
  margin: 0; /* 마진 제거 */
  padding: 0; /* 패딩 제거 */
}
.content {
  width: 100%;
  max-width: none; /* 최대 너비 제한 제거 */
  padding: 20px;
  box-sizing: border-box;
  margin: 0; /* 마진 제거 */
}
  
.main-content {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  width: 100%; /* 전체 너비 사용 */
  box-sizing: border-box; /* 패딩을 너비에 포함 */
  padding: 20px; /* 내부 여백 추가 */
}
  
  table {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse; /* 테이블 셀 간 간격 제거 */
}

  
  td, th {
  padding: 10px;
  text-align: center;
  border: 1px solid #ddd; /* 셀 경계선 추가 */
}
  
  th {
    background-color: #f2f2f2;
  }
  
  .add-button {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    display: block;  /* 변경: 블록 레벨 요소로 변경 */
    margin: 20px auto;  /* 변경: 중앙 정렬 */
  }
  
  .notice-form {
    width: 100%;
    max-width: 800px;  /* 최대 너비 설정 */
    margin: 0 auto;
    padding: 40px;
    background-color: #f0f0f0;
    border-radius: 8px;
    box-sizing: border-box;
  }
  
  .notice-form h2 {
    margin-bottom: 30px;
    font-size: 24px;
    text-align: center;  /* 추가: 제목 중앙 정렬 */
  }
  
  .form-group {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    justify-content: center;  /* 추가: 가로 중앙 정렬 */
  }
  
  .form-group label {
    width: 150px;
    margin-right: 20px;
    font-weight: bold;
    font-size: 16px;
    text-align: right;
  }
  
  .form-group input[type="text"],
  .form-group textarea,
  .form-group input[type="date"] {
    flex: 2;
    max-width: 400px;  /* 최대 너비 설정 */
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
  }
  
  .form-group textarea {
    height: 150px;
  }
  
  .form-row {
    display: flex;
    justify-content: center;  /* 변경: 중앙 정렬 */
    flex-wrap: wrap;  /* 추가: 줄바꿈 허용 */
  }
  
  .form-row .form-group {
    width: 100%;
    max-width: 400px;  /* 최대 너비 설정 */
    margin: 0 10px 20px;  /* 여백 조정 */
  }
  
  .checkbox-group {
    justify-content: center;  /* 변경: 중앙 정렬 */
  }
  
  .checkbox-group input[type="checkbox"] {
    margin-right: 10px;
  }
  
  .form-actions {
    text-align: center;
    margin-top: 30px;
  }
  
  .form-actions button {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }
  
  button:hover {
    background-color: #45a049;
  }
  
  @media (max-width: 768px) {
    .form-group {
      flex-direction: column;
      align-items: center;
    }
  
    .form-group label {
      width: 100%;
      margin-right: 0;
      margin-bottom: 5px;
      text-align: left;
    }
  
    .form-row .form-group {
      width: 100%;
      margin: 0 0 20px;
    }
  
    .form-group input[type="text"],
    .form-group textarea,
    .form-group input[type="date"] {
      max-width: 100%;
    }
  }
  </style>