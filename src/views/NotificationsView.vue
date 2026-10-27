<template>
  <div class="notifications-page">
    <h2>Уведомления</h2>
    <div class="tabs">
      <span class="active">Все</span>
      <span>Подписки</span>
      <span>Комментарии</span>
    </div>

    <div class="notification-list">
      <!-- Namuna bildirishnomalar (keyinchalik bazaga ulanadi) -->
      <div class="notif-item" v-for="i in 3" :key="i">
        <div class="avatar"></div>
        <div class="text">
          <strong>firdavs</strong> лайкнул вашу фотографию.
          <span class="time">2 ч. назад</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Logika keyinchalik qo'shiladi
</script>

<style scoped>
.notifications-page {
  width: 100%;
  max-width: 600px;
  padding: 40px 20px;
  color: #fff;
  /* QO'SHILDI: Sahifa chiqish animatsiyasi */
  animation: slideUp 0.5s ease forwards;
  opacity: 0;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

h2 { margin-bottom: 20px; font-weight: 500; }
.tabs { display: flex; gap: 20px; border-bottom: 1px solid #262626; margin-bottom: 20px; }
.tabs span { padding: 10px 0; color: #a8a8a8; cursor: pointer; font-weight: 600; font-size: 14px; transition: color 0.3s; }
.tabs span:hover { color: #fff; }
.tabs span.active { color: #fff; border-bottom: 1px solid #fff; }
.notif-item { display: flex; align-items: center; gap: 16px; padding: 16px 0; border-bottom: 1px solid #1a1a1a; transition: background 0.3s, transform 0.3s; border-radius: 8px; }
.notif-item:hover { background: rgba(255,255,255,0.05); transform: translateX(5px); padding-left: 10px; }
.avatar { width: 44px; height: 44px; border-radius: 50%; background: #333; transition: transform 0.3s; }
.notif-item:hover .avatar { transform: scale(1.1); }
.text { font-size: 14px; line-height: 1.4; color: #f5f5f5; }
.time { color: #a8a8a8; font-size: 12px; margin-left: 8px; }

/* OQ REJIM */
body.light-theme .notifications-page { color: #000; }
body.light-theme h2 { color: #000; }
body.light-theme .tabs { border-bottom: 1px solid #dbdbdb; }
body.light-theme .tabs span { color: #666; }
body.light-theme .tabs span:hover { color: #000; }
body.light-theme .tabs span.active { color: #000; border-bottom: 1px solid #000; }
body.light-theme .notif-item { border-bottom: 1px solid #efefef; }
body.light-theme .notif-item:hover { background: rgba(0,0,0,0.03); }
body.light-theme .avatar { background: #dbdbdb; }
body.light-theme .text { color: #262626; }
body.light-theme .text strong { color: #000; }
body.light-theme .time { color: #888; }
</style>