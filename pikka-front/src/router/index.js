import { createRouter, createWebHistory } from 'vue-router';
// import Home from '@/views/Home.vue'
const Home = () => import("../views/Home.vue");
const Insert = () => import("../views/Insert.vue");
const Screen = () => import("../views/Screen.vue");
const Inform = () => import("../views/Inform.vue");
const Notice = () => import("../components/Insert/notice/Notice.vue");

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/insert',
    component: Insert,

  
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