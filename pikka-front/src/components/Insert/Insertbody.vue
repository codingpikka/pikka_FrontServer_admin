<script setup>
import { useInsertStore } from '@/stores/rootstore.js';
import { computed } from "vue";
import Notice from '@/components/Insert/notice/Notice.vue';
import QandA from '@/components/Insert/QandA/QandAList.vue';
import Sidebar from '@/components/sidebar/PikkaSidebar.vue';


const store = useInsertStore();
const root = computed(() => store.root);
const setRoot = store.setRoot;

</script>



<template>
    <div class="container">
      
        <Sidebar class="sidebar" />

        <div class="main-content">
            <div v-if="root === 'Notice'">
                <Notice />
            </div>
        
            <div v-if="root === 'Query'">
                <QandA />
            </div>
        </div>
    </div>
</template>

<style scoped>

.container {
    display: flex;
}

.sidebar {
    /* width: 200px; 적절한 너비로 설정 */
    background-color: #eeb0b0; /* 예시 배경색 */
    width: 200px;
}

.main-content {
    flex-grow: 1;
    padding: 20px;
}

</style>

