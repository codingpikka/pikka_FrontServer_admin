<template>
  <div class="container">
    <div class="header">
      <div class="column">큐레이션명</div>
      <div class="column">상태</div>
      <div class="column">등록일자</div>
      <div class="column">
        <div class="new-button" @click="openNewCuration">
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
      <div class="column">{{ curation.title }}</div>
      <div class="column">
        <span :class="['status', curation.statusClass]">{{ curation.status }}</span>
      </div>
      <div class="column">{{ curation.date }}</div>
      <div class="column">
        <div class="arrow-button" @click="editJob(index)">
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
    <div class="overlay" v-if="isOverlayVisible">
      <div class="new-container">
        <div class="new-form-group">
          <label for="new-curation-name">큐레이션명</label>
          <input
            type="text"
            id="new-curation-name"
            v-model="newJob.title"
            placeholder="큐레이션명 입력"
          />
        </div>
        <div class="new-form-group">
          <label for="new-post-register">게시물등록</label>
          <div class="input-container" style="display: flex; align-items: center">
            <input
              type="text"
              id="new-post-register"
              v-model="newJob.jobInfoTitle"
              placeholder="게시물 입력하기: 클릭시 - 팝업"
              readonly
            />
            <button class="search-button" @click.stop="showPopup" style="width: 50px">
              검색
            </button>
          </div>
        </div>
        <div class="new-form-group">
          <label for="new-curation-status">상태</label>
          <select id="new-curation-status" v-model="newJob.status">
            <option value="노출중">노출중</option>
            <option value="비노출">비노출</option>
            <option value="노출예정">노출예정</option>
          </select>
        </div>
        <div class="new-button-container">
          <div class="new-thumbnail" @click="triggerFileUpload">
            <img :src="newJob.thumbnail" alt="이미지 없음" id="thumbnail-preview" />
          </div>
          <input
            type="file"
            id="thumbnail-upload"
            ref="thumbnailUpload"
            accept="image/*"
            @change="handleThumbnailUpload"
            style="display: none"
          />
          <button class="new-register-button_S" @click="addNewJobItem">완료</button>
        </div>
        <div class="new-curation-list">
          <h2>큐레이션</h2>
          <div class="new-curation-items">
            <div
              class="new-curation-item"
              v-for="(item, index) in newJobItems"
              :key="index"
            >
              <div class="new-thumbnail">
                <img :src="item.thumbnail" alt="이미지 없음" />
              </div>
              <p>{{ item.jobCompanyName }}</p>
              <p>{{ item.jobInfoTitle }}</p>
            </div>
          </div>
        </div>
        <div class="new-register-button">
          <button @click="registerJob">등록하기</button>
          <button @click="toggleOverlay">닫기</button>
          <button v-if="isEditing" @click="deleteJob">삭제하기</button>
          <!-- 삭제 버튼 추가 -->
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
          <div class="table-container">
            <table class="popup-table">
              <thead>
                <tr>
                  <th>NO</th>
                  <th>카테고리</th>
                  <th>제목</th>
                  <th>등록일자</th>
                  <th>회사명</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(post, index) in filteredResults"
                  :key="index"
                  @click="selectPost(post)"
                >
                  <td>{{ index + 1 }}</td>
                  <td>{{ post.jobCompanyName }}</td>
                  <td>{{ post.jobInfoTitle }}</td>
                  <td>{{ post.jobLocation }}</td>
                  <td>{{ post.jobCompanyName }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Curation",
  data() {
    return {
      isOverlayVisible: false,
      isPopupVisible: false, // 팝업 상태 추가
      currentIndex: 0,
      isEditing: false, // 수정 모드 플래그 추가
      newJob: {
        category: "",
        title: "",
        jobCompanyName: "", // 이 필드가 올바르게 설정되었는지 확인
        jobInfoTitle: "",
        jobWageType: "",
        jobSalary: "",
        jobLocation: "",
        jobEmploymentType: "",
        jobWebInfoUrl: "",
        jobMobileInfoUrl: "",
        status: "노출중", // 기본 상태값 설정
        thumbnail: "", // 썸네일 필드 추가
      },
      jobs: [],
      newJobItems: [],
      searchTerm: "",
      filteredResults: [],
      curations: [], // 큐레이션 목록 추가
      tempThumbnail: "", // 임시 썸네일 필드 추가
      tempThumbnailFile: null, // 임시 썸네일 파일 추가
    };
  },
  methods: {
    openNewCuration() {
      this.resetNewJob();
      this.newJobItems = []; // 신규 등록 시 newJobItems 배열 초기화
      this.toggleOverlay();
    },
    toggleOverlay() {
      this.isOverlayVisible = !this.isOverlayVisible;
      if (!this.isOverlayVisible) {
        this.isEditing = false; // 오버레이가 닫힐 때 수정 모드 플래그 초기화
      }
    },
    togglePopup() {
      this.isPopupVisible = !this.isPopupVisible;
    },
    showPopup() {
      this.isPopupVisible = true;
    },
    handleContainerClick(event) {
      if (this.newJob.jobInfoTitle.trim() === "" || event.target.tagName === "BUTTON") {
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
          this.newJob.thumbnail = e.target.result; // newJob.thumbnail에 이미지 URL 설정
        };
        reader.readAsDataURL(file);
        this.tempThumbnailFile = file; // 임시 썸네일 파일 저장
      }
    },
    addNewJobItem() {
      if (
        !this.newJob.jobCompanyName.trim() ||
        !this.newJob.jobInfoTitle.trim() ||
        !this.newJob.thumbnail.trim()
      ) {
        alert("데이터가 없습니다.");
        return;
      }

      this.newJobItems.push({
        jobCompanyName: this.newJob.jobCompanyName,
        jobInfoTitle: this.newJob.jobInfoTitle,
        thumbnail: this.newJob.thumbnail,
        status: this.newJob.status,
        statusClass: this.getStatusClass(this.newJob.status),
        date: new Date().toISOString().split("T")[0], // 실시간 날짜 설정
      });

      this.newJob.jobCompanyName = "";
      this.newJob.thumbnail = "";
      this.tempThumbnailFile = null; // 임시 썸네일 파일 초기화
      this.newJob.jobInfoTitle = "";
      this.newJob.status = "노출중"; // 기본 상태값으로 초기화
    },
    registerJob() {
      if (this.tempThumbnailFile) {
        const formData = new FormData();
        formData.append("file", this.tempThumbnailFile);

        axios
          .post("http://localhost:8083/api/curation/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            this.newJob.thumbnail = response.data; // 서버에서 반환된 이미지 URL을 저장
            this.saveCuration();
          })
          .catch((error) => {
            console.error("이미지 업로드 중 오류 발생:", error);
          });
      } else {
        this.saveCuration();
      }
    },
    saveCuration() {
      if (this.isEditing) {
        axios
          .put(`http://localhost:8083/api/curation/${this.newJob.id}`, this.newJob)
          .then(() => {
            this.fetchCurations();
            this.toggleOverlay();
          })
          .catch((error) => {
            console.error("큐레이션 수정 중 오류 발생:", error);
          });
      } else {
        axios
          .post("http://localhost:8083/api/curation", this.newJob)
          .then(() => {
            this.fetchCurations();
            this.toggleOverlay();
          })
          .catch((error) => {
            console.error("큐레이션 등록 중 오류 발생:", error);
          });
      }
    },
    deleteJob() {
      axios
        .delete(`http://localhost:8083/api/curation/${this.newJob.id}`)
        .then(() => {
          this.fetchCurations();
          this.toggleOverlay();
        })
        .catch((error) => {
          console.error("큐레이션 삭제 중 오류 발생:", error);
        });
    },
    searchPosts() {
      axios
        .get(`http://localhost:8083/api/search?term=${this.searchTerm}`)
        .then((response) => {
          this.filteredResults = response.data.filter(
            (post) => post && post.jobCompanyName && post.jobInfoTitle && post.jobLocation
          );
          this.showPopup(); // 검색 결과가 있을 때 팝업을 표시
        })
        .catch((error) => {
          console.error("검색 중 오류 발생:", error);
        });
    },
    selectPost(post) {
      this.newJob.jobInfoTitle = post.jobInfoTitle;
      this.newJob.jobCompanyName = post.jobCompanyName;
      this.newJob.jobLocation = post.jobLocation;
      this.togglePopup();
    },
    getStatusClass(status) {
      switch (status) {
        case "노출중":
          return "exposed";
        case "비노출":
          return "hidden";
        case "노출예정":
          return "scheduled";
        default:
          return "";
      }
    },
    fetchCurations() {
      axios
        .get("http://localhost:8083/api/curation")
        .then((response) => {
          this.curations = response.data.map((curation) => ({
            ...curation,
            statusClass: this.getStatusClass(curation.status),
          }));
        })
        .catch((error) => {
          console.error("큐레이션 목록을 가져오는 중 오류 발생:", error);
        });
    },
    editJob(index) {
      const job = this.curations[index];
      this.newJob = { ...job };
      this.newJobItems = []; // 편집 시 newJobItems 배열 초기화
      this.isEditing = true; // 수정 모드 플래그 설정
      this.toggleOverlay();
    },
    resetNewJob() {
      this.newJob = {
        category: "",
        title: "",
        jobCompanyName: "",
        jobInfoTitle: "",
        jobWageType: "",
        jobSalary: "",
        jobLocation: "",
        jobEmploymentType: "",
        jobWebInfoUrl: "",
        jobMobileInfoUrl: "",
        status: "노출중",
        thumbnail: "",
      };
    },
  },
  mounted() {
    this.fetchCurations(); // 컴포넌트가 마운트될 때 큐레이션 목록을 가져옴
  },
};
</script>

<style scoped>
/* 기존 스타일 유지 */
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
  display: flex;
  align-items: center;
  justify-content: center;
}

.new-curation-item img {
  max-width: 100%;
  max-height: 100%;
}

.new-curation-item p {
  margin: 0;
}

.table-container {
  max-height: 400px; /* 원하는 높이 설정 */
  overflow-y: auto;
}

.new-register-button_S {
  padding: 10px 20px;
  background-color: #e53e3e;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  margin-top: 20px;
  margin-left: 10px;
}

.new-register-button button {
  padding: 10px 20px;
  background-color: #e53e3e;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  margin-top: 20px;
  margin-right: 10px;
}

.overlay {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-overlay {
  position: fixed;
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
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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

.search-button {
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
  background-color: #e53e3e;
  color: white;
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

/* 추가된 스타일 */
.new-register-button_S {
  padding: 10px 20px;
  background-color: #e53e3e;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  margin-top: 20px;
  margin-left: 10px;
}
.new-register-button button {
  padding: 10px 20px;
  background-color: #e53e3e;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  margin-top: 20px;
  margin-right: 10px;
}
.table-container {
  height: 350px;
  overflow-y: scroll;
}
</style>
