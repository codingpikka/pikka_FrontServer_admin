<script setup>
import pikkaheader from "./components/pikkaheader.vue";
import pikkasideber from "./components/pikkasidebar.vue";
import pikkabody from "./components/pikkabody.vue";
</script>

<template>
  <pikkaheader />
  <div class="pikka_contan">
    <pikkasideber />
    <pikkabody/>
    
  </div>
  
  
  
  

</template>

<style scoped>
.pikka_contan{
  display: flex;

}

</style>
