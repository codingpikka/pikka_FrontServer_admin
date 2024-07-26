<template>
  <div class="sidebar">
    <div
      class="sidebar_add"
      @click="toggleSubmenu"
      :class="{ active: toggleSubmenu === '게시글 등록' }"
    >
      게시글 등록
    </div>
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
</template>

<script>
export default {
  data() {
    return {
      submenuVisible: false,
      selectedItem: null,
    };
  },
  methods: {
    toggleSubmenu() {
      this.submenuVisible = !this.submenuVisible;
    },
    selectItem(item) {
      this.selectedItem = item;
    },
  },
};
</script>

<style scoped>
.sidebar {
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
</style>
