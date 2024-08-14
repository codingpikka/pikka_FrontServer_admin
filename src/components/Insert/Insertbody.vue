<script setup>
import Sidebar from "@/components/sidebar/PikkaSidebar.vue";
</script>

<template>
  <div class="container">
    <Sidebar class="sidebar" />
    <div class="main-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
}

.sidebar {
  background-color: #eeb0b0;
  width: 200px;
}

.main-content {
  flex-grow: 1;
  padding: 20px;
}
</style>
