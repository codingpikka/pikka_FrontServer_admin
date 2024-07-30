<script setup>
import { ref, onMounted } from "vue";
import { useInsertStore } from "@/stores/rootstore";
import { useRouter, useRoute } from "vue-router";

const store = useInsertStore();
const router = useRouter();
const route = useRoute();
const selectedView = ref(""); // 선택된 항목을 추적하는 상태

const changeView = (view) => {
  store.setRoot(view);
  selectedView.value = view; // 선택된 항목 업데이트
  router.push({ name: view });
};

// 현재 라우트에 따라 선택된 항목을 설정
onMounted(() => {
  selectedView.value = route.name;
});
</script>

<template>
  <div class="sidebar">
    <div class="header_side">게시글 등록</div>

    <ul class="sidebar_submenu">
      <li>
        <router-link
          to="/insert/notice"
          class="sidebar_select"
          :class="{ active: selectedView === 'Notice' }"
          @click="changeView('Notice')"
        >
          공지사항
        </router-link>
      </li>
      <li>
        <router-link
          to="/insert/qna-list"
          class="sidebar_select"
          :class="{ active: selectedView === 'Query' }"
          @click="changeView('Query')"
        >
          문의사항
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.header_side {
  font-weight: bold;
  margin-bottom: 10px;
}
.sidebar_select {
  font-family: "HSSanTokki20-Regular";
}
.sidebar {
  background-color: #eeb0b0;
  width: 200px;
  padding: 10px;
  height: 100vh;
}
.sidebar_add.active {
  font-weight: bold;
}

.sidebar_submenu {
  list-style: none;
  padding: 10px 10px 0 20px;
}

.sidebar_submenu li {
  margin-bottom: 20px; /* 항목 간의 간격 추가 (10px 더 추가) */
}

.sidebar_select {
  width: 100%;
  background: none;
  border: none;
  text-align: left;
  padding: 10px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
  position: relative; /* 가상 요소를 위한 상대 위치 */
}

.sidebar_select:hover {
  background-color: #d99898;
}

.sidebar_select.active {
  font-weight: bold;
}

.sidebar_select.active::before {
  content: "";
  position: absolute;
  left: -15px; /* 버튼의 왼쪽에 위치 */
  top: 50%;
  transform: translateY(-50%);
  width: 10px;
  height: 10px;
  background-color: red;
  border-radius: 50%;
}

@font-face {
  font-family: "HSSanTokki20-Regular";
  src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/2405@1.0/HSSanTokki20-Regular.woff2")
    format("woff2");
  font-weight: normal;
  font-style: normal;
}
</style>
