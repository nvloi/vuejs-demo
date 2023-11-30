import './assets/main.css'

import { createApp } from 'vue'
import App from "@/App.vue";
import {router_app} from "@/router";
import store from './store'

const app = createApp(App)
app.use(router_app)
app.use(store)
app.mount("#app")
