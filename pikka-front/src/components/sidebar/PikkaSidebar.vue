<script setup>
import { useInsertStore } from '@/stores/rootstore';
const store = useInsertStore();
const changeView = (view) => {
  store.setRoot(view);
}

</script>

<template>
  <div class="sidebar">
    
   <div class="header_side">
    게시글 등록
   </div>

    <ul class="sidebar_submenu">

      
      <li>   
        <button class="sidebar_select" @click="changeView('Notice')">공지사항</button>

      </li>
      <li>
       
        <button class="sidebar_select" @click="changeView('Query')">문의사항</button>
      </li>
    </ul>
  </div>
</template>


<style scoped>

.header_side{
  font-weight: bold;
  margin-bottom: 10px;

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

.sidebar_select {
  width: 100%;
  background: none;
  border: none;
  text-align: left;
  padding: 10px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.sidebar_select:hover {
  background-color: #d99898;
}

</style>
