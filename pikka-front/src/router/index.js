import { createRouter, createWebHistory } from 'vue-router';

const Home = () => import("../views/Home.vue");
const Insert = () => import("../views/Insert.vue");
const Screen = () => import("../views/Screen.vue");
const Inform = () => import("../views/Inform.vue");

// Q&A 컴포넌트 import
const QandAList = () => import("../components/Insert/QandA/QandAList.vue");
const QandADetail = () => import("../components/Insert/QandA/QandADetail.vue");

// 공지사항 컴포넌트 import
const NoticeList = () => import("../components/Insert/notice/NoticeList.vue");
const NoticeDetail = () => import("../components/Insert/notice/NoticeDetail.vue");
const NoticeView = () => import("../components/Insert/notice/NoticeView.vue");

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/insert',
    component: Insert,
    children: [
      {
        path: 'qna-list',
        name: 'QandAList',
        component: QandAList,
      },
      {
        path: 'qna-detail/:id',
        name: 'QandADetail',
        component: QandADetail,
        props: true,
      },
      // 공지사항 라우트는 그대로 유지
      {
        path: 'notice',
        name: 'NoticeList',
        component: NoticeList,
      },
      {
        path: 'notice/new',
        name: 'NoticeCreate',
        component: NoticeDetail,
      },
      {
        path: 'notice/:id',
        name: 'NoticeView',
        component: NoticeView,
        props: true,
      },
      {
        path: 'notice/:id/edit',
        name: 'NoticeEdit',
        component: NoticeDetail,
        props: true,
      }
    ]
  },
  {
    path: '/screen',
    name: 'Screen',
    component: Screen
  },
  {
    path: '/info',
    name: 'Inform',
    component: Inform
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;