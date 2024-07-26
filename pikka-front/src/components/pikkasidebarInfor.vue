<template>
  <div class="sidebar">
    <div
      class="sidebar_information"
      @click="toggleSubmenu"
      :class="{ active: toggleSubmenu === '정보 등록' }"
    >
      정보 등록
    </div>
    <ul class="sidebar_submenu" v-if="submenuVisible">
      <li
        class="sidebar_select01"
        @click="selectItem('취업')"
        :class="{ active: selectedItem === '취업' }"
      >
        <a href="#">
          <span class="icon01" v-if="selectedItem === '취업'"></span>
          취업
        </a>
      </li>
      <li
        class="sidebar_select02"
        @click="selectItem('자격증')"
        :class="{ active: selectedItem === '자격증' }"
      >
        <a href="#">
          <span class="icon02" v-if="selectedItem === '자격증'"></span>
          자격증
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
.sidebar_information.active {
  font-weight: bold;
}

.sidebar_information {
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
