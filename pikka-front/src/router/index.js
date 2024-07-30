import { createRouter, createWebHistory } from 'vue-router';
// import Home from '@/views/Home.vue'
const Home = () => import("../views/Home.vue");
const Insert = () => import("../views/Insert.vue");
const Screen = () => import("../views/Screen.vue");
const Inform = () => import("../views/Inform.vue");
const Notice = () => import("../components/Insert/notice/Notice.vue");
const QandAList = () => import("../components/Insert/QandA/QandAList.vue");
const QandADetail = () => import("../components/Insert/QandA/QandADetail.vue");

const routes = [
  {
    path: '/',
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
      {
        path: 'notice',
        name: 'Notice',
        component: Notice,
      },
    ]
  },
  {
    path: '/screen',
    component: Screen
  },
  {
    path: '/info',
    component: Inform
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;