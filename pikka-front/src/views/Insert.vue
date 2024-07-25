<script setup>
import Header from '@/components/PikkaHeader.vue'
import Sidebar from '@/components/sidebar/PikkaSidebar.vue'

import InsertBody from '@/components/Insert/Insertbody.vue'


</script>

<template>

    <div class="app-container">

        <Header class= "header" />
      
        <div class="main-content">
            <Sidebar class="sidebar" />
          
            
            <InsertBody class="insert-body" />

        </div>

    </div>
    
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.header {
  flex: 0 0 auto;
}

.main-content {
  flex: 1;
  overflow: hidden;
}

.sidebar {
  flex: 0 0 200px; /* 사이드바의 너비를 설정합니다 */
  overflow-y: auto;
}

.insert-body {
  flex: 1;
  overflow-y: auto;
}
</style>