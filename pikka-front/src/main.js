import { createApp } from 'vue';
import { createPinia } from 'pinia'
import App from './App.vue';
import router from './router'; // './router/index'가 아닌 './router'만으로 충분합니다.

import './assets/css/reset.css';
import './assets/css/common.css';



const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
