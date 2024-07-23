<script setup>
import pikkaheader from "./components/pikkaheader.vue";
import pikkasideberPost from "./components/pikkasidebarPost.vue";
import pikkabody from "./components/pikkabody.vue";
import pikkasidebarScreen from "./components/pikkasidebarScreen.vue";
import pikkasidebarInfor from "./components/pikkasidebarInfor.vue";
</script>

<template>
  <pikkaheader />
  <div class="pikka_contan">
    <!-- <pikkasideberPost /> -->
    <!-- <pikkasidebarScreen/> -->
    <pikkasidebarInfor/>
    <pikkabody/>
  </div>
</template>

<style scoped>
.pikka_contan{
  display: flex;
}

</style>
