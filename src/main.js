import './assets/main.css'

import { createApp } from 'vue'
import App from "@/App.vue";
import {router_app} from "@/router";
import store from './store'
import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp(App)
app.use(router_app)
app.use(store)
app.use(pinia)
app.mount("#app")
