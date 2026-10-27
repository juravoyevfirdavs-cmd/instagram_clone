<template>
  <div class="app-container" :class="{ 'light-mode': isLightMode }">
    <aside class="sidebar" v-if="!isAuthPage">
      <div class="logo">
        <span>Instagram</span>
      </div>

      <nav class="nav-links">
        <router-link to="/" class="nav-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          <span>Главная</span>
        </router-link>
        
        <router-link to="/reels" class="nav-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
          <span>Reels</span>
        </router-link>

        <router-link to="/chat" class="nav-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          <span>Сообщения</span>
        </router-link>

        <router-link to="/notifications" class="nav-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          <span>Уведомления</span>
        </router-link>

        <div class="nav-item" @click="openCreatePost">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          <span>Создать</span>
        </div>

        <router-link to="/profile" class="nav-item">
          <img 
            v-if="authStore?.user?.profilePic" 
            :src="authStore.user.profilePic" 
            class="profile-avatar" 
            alt="avatar"
          />
          <div v-else class="profile-avatar-placeholder"></div>
          <span>Профиль ({{ authStore?.user?.username || 'firdavs' }})</span>
        </router-link>
      </nav>

      <div class="bottom-menu">
        <router-link to="/settings" class="nav-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          <span>Ещё (Настройки)</span>
        </router-link>
      </div>
    </aside>

    <main class="main-content" :class="{ 'full-width': isAuthPage }">
      <!-- FAQAT SHU QISM O'ZGARDI: Sahifalararo o'tish animatsiyasi qo'shildi -->
      <router-view v-slot="{ Component }">
        <transition name="fade-slide" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from './stores/auth';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const isAuthPage = computed(() => route.path === '/login' || route.path === '/register');

// --- QORA VA OQ REJIM LOGIKASI ---
const isLightMode = ref(false);

// Sahifa yuklanganda xotiradan rejimni olish va BODY ga klass qo'shish
onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    isLightMode.value = true;
    document.body.classList.add('light-theme');
  } else {
    document.body.classList.remove('light-theme');
  }
});

// Rejim o'zgarganda BODY ga klass qo'shish yoki olib tashlash
watch(isLightMode, (newVal) => {
  if (newVal) {
    document.body.classList.add('light-theme');
    localStorage.setItem('theme', 'light');
  } else {
    document.body.classList.remove('light-theme');
    localStorage.setItem('theme', 'dark');
  }
});

// Post qo'shish funksiyasi
const openCreatePost = () => {
  router.push('/?create=true');
};
</script>

<style>
/* SIZNING ASL CSS KODINGIZ - UMUMAN TEGILMADI */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  transition: background 0.3s ease, color 0.3s ease; 
}

/* QORONG'U REJIM (Standart) */
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  background: radial-gradient(circle at top right, #1a1a1a, #000000 80%) !important;
  color: #f5f5f5 !important;
  min-height: 100vh;
  overflow-x: hidden;
}

/* OQ REJIM UCHUN BODY */
body.light-theme {
  background: #fafafa !important;
  color: #000000 !important;
}

.app-container {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 260px;
  background: rgba(15, 15, 15, 0.7) !important;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 1000;
  box-shadow: 10px 0 30px rgba(0,0,0,0.5);
}

.logo {
  padding: 20px 12px;
  margin-bottom: 30px;
}

.logo span {
  font-family: cursive; 
  font-size: 26px; 
  font-weight: bold;
  background: linear-gradient(45deg, #ffffff, #a8a8a8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.nav-links {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 16px;
  color: #d1d1d1;
  text-decoration: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

/* QO'SHILDI: Menyu ikonkalari uchun hover animatsiyasi */
.nav-item svg {
  transition: transform 0.3s ease, stroke 0.3s ease;
}
.nav-item:hover svg {
  transform: scale(1.15) rotate(5deg);
}

.nav-item::before {
  content: '';
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: linear-gradient(90deg, rgba(255,255,255,0.1), transparent);
  opacity: 0;
  transition: opacity 0.3s;
}

.nav-item:hover::before {
  opacity: 1;
}

.nav-item:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.08);
  transform: translateX(5px);
}

.router-link-active.nav-item {
  background: rgba(255, 255, 255, 0.15);
  color: #ffffff;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  border: 1px solid rgba(255,255,255,0.1);
}

.profile-avatar, .profile-avatar-placeholder {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid transparent;
  background-clip: padding-box;
}
.profile-avatar-placeholder {
  background-color: #333;
}

.main-content {
  margin-left: 260px;
  width: calc(100% - 260px);
  display: flex;
  justify-content: center;
  min-height: 100vh;
}

.main-content.full-width {
  margin-left: 0;
  width: 100%;
}

.bottom-menu {
  margin-top: auto;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

/* ========================================= */
/* OQ REJIM (LIGHT MODE) UCHUN STILLAR       */
/* ========================================= */
body.light-theme .sidebar {
  background: rgba(255, 255, 255, 0.85) !important;
  border-right: 1px solid #dbdbdb;
  box-shadow: 10px 0 30px rgba(0,0,0,0.1);
}

body.light-theme .logo span {
  background: linear-gradient(45deg, #000, #555);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

body.light-theme .nav-item { color: #262626; }
body.light-theme .nav-item:hover { background: rgba(0, 0, 0, 0.05); color: #000; }

body.light-theme .router-link-active.nav-item {
  background: rgba(0, 0, 0, 0.1);
  color: #000;
  border: 1px solid #dbdbdb;
}

body.light-theme .profile-avatar-placeholder { background-color: #dbdbdb; }
body.light-theme .bottom-menu { border-top: 1px solid #dbdbdb; }

/* ========================================= */
/* QO'SHILDI: SAHIFALARARO O'TISH ANIMATSIYASI */
/* ========================================= */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(15px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-15px);
}
</style>