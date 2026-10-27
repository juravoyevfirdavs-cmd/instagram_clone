// frontend/src/main.js
import './assets/main.css'
import './assets/instagram.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/auth'

// async funksiya yaratamiz
async function initApp() {
  const app = createApp(App)
  app.use(createPinia())

  // Mavzuni (Theme) yuklash
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
  }

  // Sessiyani tiklash
  try {
    await useAuthStore().fetchMe()
  } catch (error) {
    console.log("Sessiya tiklanmadi:", error)
  }

  app.use(router)
  app.mount('#app')
}

// Funksiyani ishga tushirish
initApp()