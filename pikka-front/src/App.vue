<script setup>
import Curation from "./components/curation.vue"; // 큐레이션
import NoticeManagement from "./components/NoticeManagement.vue"; // 공지사항
import Pikkaheader from "./components/pikkaheader.vue"; // 관리자 페이지 헤더
import Pikkabody from "./components/pikkabody.vue"; // 관리자 페이지 바디 영역
import PikkasidebarInfor from "./components/pikkasidebarInfor.vue"; // 정보 등록 사이드 바
import PikkasidebarPost from "./components/pikkasidebarPost.vue"; // 게시물 등록 사이드 바
import PikkasidebarScreen from "./components/pikkasidebarScreen.vue"; // 화면 관리 사이드
</script>

<template>
  <Pikkaheader @change-sidebar="setSidebar" />
  <Pikkabody>
    <component :is="currentSidebar" />
  </Pikkabody>
</template>

<style scoped></style>

<script>
export default {
  name: "App",
  components: {
    Pikkaheader,
  },
  data() {
    return {
      currentSidebar: null,
    };
  },
  methods: {
    setSidebar(sidebar) {
      switch (sidebar) {
        case "post":
          this.currentSidebar = PikkasidebarPost;
          break;
        case "infor":
          this.currentSidebar = PikkasidebarInfor;
          break;
        case "screen":
          this.currentSidebar = PikkasidebarScreen;
          break;
        default:
          this.currentSidebar = null;
          break;
      }
    },
  },
};
</script>
