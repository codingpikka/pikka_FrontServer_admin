<script setup>
import { useInsertStore } from '@/stores/rootstore.js';
import { computed } from "vue";
import Notice from '@/components/Insert/notice/Notice.vue';
import QandA from '@/components/Insert/QandA/QandAList.vue';


const store = useInsertStore();
const root = computed(() => store.root);
const setRoot = store.setRoot;

</script>


<template>



    <div v-if="root === 'Notice'">
        <Notice />

    </div>

    <div v-if="root === 'Query'">
    
        <QandA />

    </div>



</template>