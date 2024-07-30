<script setup>
import { useInsertStore } from "@/stores/rootstore";
import { computed } from "vue";
import Curation from "@/components/screen/Curation.vue"; // 올바른 경로로 import
import Sidebar2 from "@/components/sidebar/PikkaSidebarScreen2.vue";

const store = useInsertStore();
const root = computed(() => store.root);
const setRoot = store.setRoot;
</script>

<template>
  <Sidebar2 />
  <Curation />
  <!-- Curation 컴포넌트를 사용 -->
</template>
