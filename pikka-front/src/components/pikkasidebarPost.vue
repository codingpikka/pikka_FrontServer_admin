<template>
  <div class="sidebar">
    <!-- 게시물 등록 헤더 -->
    <div
      class="sidebar_add"
      @click="toggleSubmenu"
      :class="{ active: submenuVisible }"
    >
      게시물 등록
    </div>

    <!-- 하위 메뉴 토글 -->
    <ul class="sidebar_submenu" v-if="submenuVisible">
      <li
        class="sidebar_select01"
        @click="selectItem('공지사항')"
        :class="{ active: selectedItem === '공지사항' }"
      >
        <a href="#">
          <span class="icon01" v-if="selectedItem === '공지사항'"></span>
          공지사항
        </a>
      </li>
      <li
        class="sidebar_select02"
        @click="selectItem('문의사항')"
        :class="{ active: selectedItem === '문의사항' }"
      >
        <a href="#">
          <span class="icon02" v-if="selectedItem === '문의사항'"></span>
          문의사항
        </a>
      </li>
    </ul>
  </div>

  <!-- 본문 영역 -->
  <div class="pikka_body">
    <!-- 조건부 렌더링 -->
    <!-- selectedItem이 '공지사항'일 때 NoticeManagement 컴포넌트를 렌더링 -->
    <NoticeManagement v-if="selectedItem === '공지사항'" />
    <!-- 다른 컴포넌트도 추가할 수 있습니다. -->
  </div>
</template>

<script>
import NoticeManagement from "../components/NoticeManagement.vue"; // 공지사항 컴포넌트 import

export default {
  components: {
    NoticeManagement,
  },
  data() {
    return {
      submenuVisible: false,
      selectedItem: null,
    };
  },
  methods: {
    toggleSubmenu() {
      this.submenuVisible = !this.submenuVisible; // 하위 메뉴의 가시성 토글
    },
    selectItem(item) {
      this.selectedItem = item; // 선택된 항목 업데이트
    },
  },
};
</script>

<style scoped>
.sidebar {
  top: 0;
  left: 0;
  background-color: #eeb0b0;
  width: 200px;
  padding: 10px;
  height: 100vh;
}
.sidebar_add.active {
  font-weight: bold;
}

.sidebar_add {
  margin: 10px 0 0 10px;
  cursor: pointer;
}

.sidebar_submenu {
  list-style: none;
  padding: 10px 10px 0 20px;
}
.sidebar_select01 {
  margin-bottom: 10px;
}

.sidebar_select01.active {
  color: black;
  margin-bottom: 10px;
  font-weight: bold;
}

.sidebar_select02.active {
  color: black;
  font-weight: bold;
  margin-top: 10px;
}

.icon01 {
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: #fe6565;
  border-radius: 50%;
}
.icon02 {
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: #fe6565;
  border-radius: 50%;
}
.main-content {
  display: flex;
  align-items: center;
}
</style>
