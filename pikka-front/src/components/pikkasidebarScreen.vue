<template>
  <div class="sidebar">
    <div
      class="sidebar_screen"
      @click="toggleSubmenu"
      :class="{ active: toggleSubmenu === '화면 관리' }"
    >
      화면 관리
    </div>
    <ul class="sidebar_submenu" v-if="submenuVisible">
      <li
        class="sidebar_select01"
        @click="selectItem('큐레이션')"
        :class="{ active: selectedItem === '큐레이션' }"
      >
        <a href="#">
          <span class="icon01" v-if="selectedItem === '큐레이션'"></span>
          큐레이션
        </a>
      </li>
      <li
        class="sidebar_select02"
        @click="selectItem('베너')"
        :class="{ active: selectedItem === '베너' }"
      >
        <a href="#">
          <span class="icon02" v-if="selectedItem === '베너'"></span>
          베너
        </a>
      </li>
    </ul>
    <div class="content">
    <aside class="sidebar_container">
      <ul class="sidebar-menu">
        <li v-for="item in sidebarMenu" :key="item.text">
          <a href="#" class="submenu-item" :class="{ active: selectedItem === item.text }" @click="selectItem(item.text)">
            <span v-if="selectedItem === item.text" class="dot"></span>
            {{ item.text }}
          </a>
        </li>
      </ul>
    </aside>
    
  </div>
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
.sidebar_screen.active {
  font-weight: bold;
}

.sidebar_screen {
  margin: 10px 0 0 10px;
  cursor: pointer;
}

.sidebar_submenu {
  list-style: none;
  padding: 10px 10px 0 20px;
}
.sidebar_select01{
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
</style>
