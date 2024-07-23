<template>
  <div class="container">
    <div class="header">
      <div class="column">큐레이션명</div>
      <div class="column">상태</div>
      <div class="column">등록일자</div>
      <div class="column">
        <div class="new-button" @click="toggleOverlay">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 15.8333L15.8333 10L18.3333 12.5L12.5 18.3333L10 15.8333Z"
              stroke="#FFFCFE"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M14.9993 10.8337L13.7493 4.58366L1.66602 1.66699L4.58268 13.7503L10.8327 15.0003L14.9993 10.8337Z"
              stroke="#FFFCFE"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M1.66602 1.66699L7.98768 7.98866"
              stroke="#FFFCFE"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9.16667 10.8333C10.0871 10.8333 10.8333 10.0871 10.8333 9.16667C10.8333 8.24619 10.0871 7.5 9.16667 7.5C8.24619 7.5 7.5 8.24619 7.5 9.16667C7.5 10.0871 8.24619 10.8333 9.16667 10.8333Z"
              stroke="#FFFCFE"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          신규등록
        </div>
      </div>
    </div>

    <div class="row" v-for="(curation, index) in curations" :key="index">
      <div class="column">{{ curation.name }}</div>
      <div class="column">
        <span :class="['status', curation.statusClass]">{{ curation.status }}</span>
      </div>
      <div class="column">{{ curation.date }}</div>
      <div class="column">
        <div class="arrow-button" @click="toggleOverlay">
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M27.9375 0.9375H2.0625C1.44023 0.9375 0.9375 1.44023 0.9375 2.0625V27.9375C0.9375 28.5598 1.44023 29.0625 2.0625 29.0625H27.9375C28.5598 29.0625 29.0625 28.5598 29.0625 27.9375V2.0625C29.0625 1.44023 28.5598 0.9375 27.9375 0.9375ZM20.1574 15.2285L11.509 21.4863C11.3227 21.6199 11.0625 21.4863 11.0625 21.2578V19.609C11.0625 19.2504 11.2348 18.9094 11.5266 18.6984L16.6383 15L11.5266 11.3016C11.2348 11.0906 11.0625 10.7531 11.0625 10.391V8.74219C11.0625 8.51367 11.3227 8.38008 11.509 8.51367L20.1574 14.7715C20.3121 14.884 20.3121 15.116 20.1574 15.2285Z"
              fill="black"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>

  <div class="overlay" v-if="isOverlayVisible">
    <div class="new-container">
      <div class="new-header">
        <h1>큐레이션 등록하기</h1>
      </div>

      <div class="new-form-group">
        <label for="new-curation-name">큐레이션명</label>
        <input
          type="text"
          id="new-curation-name"
          v-model="newCuration.name"
          placeholder="placeholder 로 큐레이션 글자수 넣기(최대 20자)"
        />
      </div>

      <div class="new-form-group">
        <label for="new-post-register">게시물등록</label>
        <div class="new-search-container" @click="handleContainerClick">
          <input
            type="text"
            id="new-post-register"
            v-model="newCuration.postRegister"
            placeholder="게시물 입력하기: 클릭시 - 팝업"
            readonly
          />
          <button @click.stop="showPopup">검색</button>
        </div>
      </div>

      <div class="new-button-container">
        <div class="new-thumbnail" @click="triggerFileUpload">
          <img :src="newCuration.thumbnail" alt="이미지 없음" id="thumbnail-preview" />
        </div>
        <input
          type="file"
          id="thumbnail-upload"
          ref="thumbnailUpload"
          accept="image/*"
          @change="handleThumbnailUpload"
          style="display: none"
        />
        <button class="new-register-button" @click="addNewCurationItem">완료</button>
      </div>

      <div class="new-curation-list">
        <h2>큐레이션</h2>
        <div class="new-curation-items">
          <div
            class="new-curation-item"
            v-for="(item, index) in newCurationItems"
            :key="index"
          >
            <div class="new-thumbnail">
              <img :src="item.thumbnail" alt="이미지 없음" />
            </div>
            <p>{{ item.title }}</p>
          </div>
        </div>
      </div>

      <div class="new-register-button">
        <button @click="toggleOverlay">등록하기</button>
      </div>
    </div>
  </div>

  <div class="popup-overlay" v-if="isPopupVisible">
    <div class="popup-container">
      <div class="popup-header">
        <h1>등록하고 싶은 게시물의 제목 입력하세요</h1>
        <button class="close-popup" @click="togglePopup">X</button>
      </div>
      <div class="popup-body">
        <div class="popup-form-group">
          <label for="post-title">게시물명</label>
          <div class="input-container">
            <input
              type="text"
              id="post-title"
              v-model="searchTerm"
              placeholder="개발자"
              @keyup.enter="searchPosts"
            />
            <button class="search-button" @click="searchPosts">검색</button>
          </div>
        </div>
        <table class="popup-table">
          <thead>
            <tr>
              <th>NO</th>
              <th>카테고리</th>
              <th>제목</th>
              <th>날짜</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="post in filteredResults" :key="post.no" @click="selectPost(post)">
              <td>{{ post.no }}</td>
              <td>{{ post.category }}</td>
              <td>{{ post.title }}</td>
              <td>{{ post.date }}</td>
            </tr>
          </tbody>
        </table>
        <button class="register-button" @click="registerPost">등록하기</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOverlayVisible: false,
      isPopupVisible: false,
      currentIndex: 0,
      newCuration: {
        name: "",
        postRegister: "",
        postName: "",
        thumbnail: "",
      },
      curations: [
        {
          name: "큐레이션1: 겨울방학 관공서 일자리 정보",
          status: "노출중",
          statusClass: "exposed",
          date: "2024-00-00",
        },
        {
          name: "큐레이션: 이거 테스트임",
          status: "비노출",
          statusClass: "hidden",
          date: "2024-00-00",
        },
        {
          name: "큐레이션4: Job아보자 에디터 pick 자격증",
          status: "노출예정",
          statusClass: "scheduled",
          date: "2024-00-00",
        },
        {
          name: "큐레이션2: 취업보장 자격증 정보",
          status: "노출중",
          statusClass: "exposed",
          date: "2024-00-00",
        },
        {
          name: "큐레이션3: Job아보자 추천 일자리 리스트",
          status: "노출중",
          statusClass: "exposed",
          date: "2024-00-00",
        },
      ],
      newCurationItems: [],
      searchTerm: "",
      searchResults: [
        {
          no: 1,
          category: "자유게시판",
          title: "개발 취업 가능할까요?",
          date: "2024-xx-xx",
        },
        {
          no: 2,
          category: "자유게시판",
          title: "CRDU 마스터하고 개발자 되기",
          date: "2024-xx-xx",
        },
        {
          no: 3,
          category: "취업",
          title: "[채용공고(~10/31)] 풀스택 개발자",
          date: "2024-xx-xx",
        },
        {
          no: 4,
          category: "자격증",
          title: "SQL 개발자 자격시험정보",
          date: "2024-xx-xx",
        },
      ],
      filteredResults: [],
    };
  },
  computed: {
    // 기존의 filteredResults는 삭제합니다.
  },
  methods: {
    toggleOverlay() {
      this.isOverlayVisible = !this.isOverlayVisible;
    },
    togglePopup() {
      this.isPopupVisible = !this.isPopupVisible;
    },
    showPopup() {
      this.isPopupVisible = true;
      this.isOverlayVisible = false;
    },
    handleContainerClick(event) {
      if (
        this.newCuration.postRegister.trim() === "" ||
        event.target.tagName === "BUTTON"
      ) {
        this.showPopup();
      } else {
        event.stopPropagation();
      }
    },
    triggerFileUpload() {
      this.$refs.thumbnailUpload.click();
    },
    handleThumbnailUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.newCuration.thumbnail = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    addNewCurationItem() {
      if (
        !this.newCuration.thumbnail ||
        this.newCuration.thumbnail === window.location.href
      ) {
        alert("이미지를 등록하세요.");
        return;
      }

      if (!this.newCuration.postRegister) {
        alert("게시물명을 입력하세요.");
        return;
      }

      this.newCurationItems.push({
        thumbnail: this.newCuration.thumbnail,
        title: this.newCuration.postRegister,
      });

      this.newCuration.thumbnail = "";
      this.newCuration.postRegister = "";
    },
    searchPosts() {
      this.filteredResults = this.searchResults.filter((post) =>
        post.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
    selectPost(post) {
      this.newCuration.postRegister = post.title;
      this.togglePopup();
      this.toggleOverlay();
    },
    registerPost() {
      // 등록 로직 추가
    },
  },
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
}

.container {
  width: 100%;
}

.header,
.row {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
}

.header {
  border-bottom: 2px solid #ccc;
}

.row {
  background-color: rgb(255, 235, 235, 0.5);
  margin-bottom: 10px;
  border-radius: 8px;
  padding: 15px;
}

.column {
  flex: 1;
  text-align: center;
}

.status {
  display: inline-block;
  padding: 5px 10px;
  border-radius: 12px;
  color: white;
}

.status.exposed {
  background-color: #38a169;
}

.status.hidden {
  background-color: #e53e3e;
}

.status.scheduled {
  background-color: #dd6b20;
}

.new-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eeb0b0;
  width: 135px;
  height: 40px;
  border-radius: 8px;
  cursor: pointer;
  color: white;
}

.new-button svg {
  margin-right: 10px;
}

.arrow-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 144px;
  height: 30px;
  cursor: pointer;
}

.new-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
}

.new-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom: 220px 0;
  border-bottom: 2px solid #ccc;
}

.new-header h1 {
  margin: 0;
  font-size: 24px;
}

.new-form-group {
  margin: 20px 0;
}

.new-form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.new-form-group input[type="text"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.new-form-group .new-search-container {
  display: flex;
  align-items: center;
}

.new-form-group .new-search-container input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px 0 0 4px;
}

.new-form-group .new-search-container button {
  padding: 10px;
  border: 1px solid #ccc;
  border-left: none;
  background-color: #e53e3e;
  color: white;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
}

.new-thumbnail {
  width: 200px;
  height: 150px;
  border: 2px dashed #e53e3e;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #e53e3e;
}

.new-thumbnail img {
  width: 100%;
  height: 100%;
}

.new-button-container {
  display: flex;
  align-items: flex-end;
}

.new-button-container button {
  padding: 10px 20px;
  background-color: #e53e3e;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 70px;
  height: 38px;
  margin-left: 30px;
}

.new-curation-list {
  margin-top: 40px;
}

.new-curation-list h2 {
  margin-bottom: 20px;
  font-size: 20px;
}

.new-curation-items {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.new-curation-item {
  width: 18%;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  text-align: center;
  margin-bottom: 20px;
}

.new-curation-item .new-thumbnail {
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
}

.new-curation-item p {
  margin: 0;
  font-size: 14px;
}

.new-register-button {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.new-register-button button {
  padding: 10px 20px;
  background-color: #e53e3e;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.overlay {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
}

.new-container {
  margin-top: 35px;
}

/* 팝업 */
.popup-overlay {
  position: fixed;
  /* fixed로 변경하여 화면 중앙에 고정 */
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-container {
  width: 100%;
  max-width: 600px;
  /* 팝업의 최대 너비 설정 */
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  /* 모서리 둥글게 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* 그림자 추가 */
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom: 2px solid #ccc;
}

.popup-header h1 {
  margin: 0;
  font-size: 24px;
}

.popup-body {
  margin-top: 20px;
}

.popup-form-group {
  margin: 20px 0;
}

.popup-form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.popup-form-group .input-container {
  display: flex;
  align-items: center;
}

.popup-form-group input[type="text"] {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px 0 0 4px;
}

.popup-form-group .search-button {
  padding: 10px;
  border: 1px solid #ccc;
  border-left: none;
  background-color: #e53e3e;
  color: white;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
}

.popup-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.popup-table th,
.popup-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.popup-table th {
  background-color: #f2dede;
}

.register-button {
  display: block;
  width: 100%;
  padding: 10px 20px;
  background-color: #f2dede;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  margin-top: 20px;
}

.close-popup {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}
</style>
