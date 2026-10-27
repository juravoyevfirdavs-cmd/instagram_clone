import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ChatView from '../views/ChatView.vue'
import ReelsView from '../views/ReelsView.vue'
// Yangi sahifalarni import qilamiz
import NotificationsView from '../views/NotificationsView.vue'
import SettingsView from '../views/SettingsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/chat', name: 'chat', component: ChatView },
    { path: '/reels', name: 'reels', component: ReelsView },
    // Yangi routelar
    { path: '/notifications', name: 'notifications', component: NotificationsView },
    { path: '/settings', name: 'settings', component: SettingsView },
  ]
})

export default router