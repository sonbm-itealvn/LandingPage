import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

const redirectPath = sessionStorage.getItem('redirect')
if (redirectPath) {
  sessionStorage.removeItem('redirect')
  router.replace(redirectPath)
}

app.use(router)

app.mount('#app')
