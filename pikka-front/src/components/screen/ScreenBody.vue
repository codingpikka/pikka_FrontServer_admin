<script setup>

import { useInsertStore } from '@/stores/rootstore';
import { computed } from "vue";
import Curation from '@/components/screen/ScreenBody.vue'
import Sidebar2 from '@/components/sidebar/PikkaSidebarScreen2.vue'


const store = useInsertStore();
const root = computed(() => store.root);
const setRoot = store.setRoot;

</script>

<template>

<Sidebar2 />

<div v-if="root === 'Curation'">

    <Curation />

</div>

<Curation />

</template>