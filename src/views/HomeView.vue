<template>
  <div class="home-layout">
    <div class="feed">
      <div class="post">
        <div class="post-header">
          <div class="user">
            <div class="avatar"></div>
            <span class="username">{{ authStore?.user?.username || 'firdavs' }}</span>
          </div>
        </div>
        
        <div class="post-image">
          <div style="width: 100%; height: 500px; background: linear-gradient(45deg, #111, #222); display: flex; align-items: center; justify-content: center; color: #444; font-size: 20px; font-weight: bold;">
            Post Rasmi
          </div>
        </div>

        <div class="post-actions">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
        </div>
      </div>
    </div>

    <div class="right-panel">
      <div class="current-user">
        <div class="avatar"></div>
        <div class="info">
          <span class="username">{{ authStore?.user?.username || 'firdavs' }}</span>
          <span class="name">Sizning ismingiz</span>
        </div>
      </div>

      <div class="suggestions-header">
        <span>Рекомендации для вас</span>
        <span class="see-all">Все</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth';
const authStore = useAuthStore();
</script>

<style scoped>
.home-layout {
  display: flex;
  max-width: 950px;
  width: 100%;
  padding-top: 40px;
  gap: 60px;
}

.feed {
  width: 470px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

/* QORONG'U REJIM */
.post {
  background: rgba(20, 20, 20, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding-bottom: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  /* QO'SHILDI: Post chiqish animatsiyasi */
  animation: slideUp 0.5s ease forwards;
  opacity: 0;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

/* QO'SHILDI: Post hover animatsiyasi */
.post:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 25px rgba(0,0,0,0.4);
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.post-header { display: flex; justify-content: space-between; align-items: center; padding: 16px; }
.user { display: flex; align-items: center; gap: 12px; }
.avatar {
  width: 36px; height: 36px; border-radius: 50%;
  background: linear-gradient(45deg, #333, #555);
  border: 2px solid rgba(255,255,255,0.1);
  transition: transform 0.3s ease;
}
.user:hover .avatar { transform: scale(1.1); }
.username { font-weight: 600; font-size: 14px; letter-spacing: 0.5px; color: #fff; }
.post-image { border-top: 1px solid rgba(255,255,255,0.05); border-bottom: 1px solid rgba(255,255,255,0.05); }
.post-image div { background: linear-gradient(45deg, #111, #222) !important; color: #444 !important; }
.post-actions { padding: 16px; cursor: pointer; transition: transform 0.2s; }
.post-actions svg { stroke: #fff; }
.post-actions:hover { transform: scale(1.1); }

.right-panel { width: 320px; padding-top: 10px; }
.current-user { display: flex; align-items: center; margin-bottom: 24px; background: rgba(255,255,255,0.03); padding: 16px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05); }
.current-user .info { display: flex; flex-direction: column; margin-left: 16px; }
.current-user .name { color: #888; font-size: 13px; margin-top: 4px; }
.suggestions-header { display: flex; justify-content: space-between; margin-bottom: 16px; font-weight: 600; font-size: 14px; color: #aaa; padding: 0 8px; }
.see-all { color: #fff; cursor: pointer; font-weight: bold; }

/* OQ REJIM */
body.light-theme .post { background: #ffffff; border: 1px solid #dbdbdb; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
body.light-theme .post:hover { box-shadow: 0 12px 25px rgba(0,0,0,0.1); }
body.light-theme .username { color: #000; }
body.light-theme .avatar { background: linear-gradient(45deg, #dbdbdb, #f0f0f0); border: 2px solid #ffffff; }
body.light-theme .post-image div { background: #efefef !important; color: #999 !important; }
body.light-theme .post-actions svg { stroke: #262626; }
body.light-theme .current-user { background: #ffffff; border: 1px solid #dbdbdb; }
body.light-theme .current-user .username { color: #000; }
body.light-theme .current-user .name { color: #666; }
body.light-theme .suggestions-header { color: #666; }
body.light-theme .see-all { color: #0095f6; }
</style>