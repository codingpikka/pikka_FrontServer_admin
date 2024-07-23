<script setup>
import pikkaheader from "./components/pikkaheader.vue";
import pikkasideberPost from "./components/pikkasidebarPost.vue";
import pikkabody from "./components/pikkabody.vue";
import pikkasidebarScreen from "./components/pikkasidebarScreen.vue";
import pikkasidebarInfor from "./components/pikkasidebarInfor.vue";
import NoticeManagement from "./components/NoticeManagement.vue";
</script>

<template>
  <pikkaheader />
  <div class="pikka_contan">
    <!-- <pikkasideberPost /> -->
    <!-- <pikkasidebarScreen/> -->
     
    <pikkasidebarInfor/>
    <NoticeManagement/>
    <pikkabody/>
    
  </div>
</template>

<style scoped>
.pikka_contan{
  /* width: 100%; */
  display: flex;
}

</style>
