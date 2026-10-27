<template>
  <div class="chat-layout">
    <div class="chat-sidebar">
      <div class="sidebar-header">
        <h3>{{ authStore?.user?.username || 'firdavs' }} <span>v</span></h3>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
      </div>
      
      <div class="search">
        <input type="text" placeholder="Поиск" />
      </div>

      <div class="chat-list-empty">
        Chats will appear here after you send or receive a message
      </div>
    </div>

    <div class="chat-main">
      <div class="empty-state">
        <div class="icon-circle">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </div>
        <h2>Ваши сообщения</h2>
        <p>Отправляйте личные фото и сообщения другу или группе.</p>
        <button class="btn-primary">Отправить сообщение</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth';
const authStore = useAuthStore();
</script>

<style scoped>
.chat-layout {
  display: flex;
  width: 100%;
  max-width: 1100px;
  height: calc(100vh - 20px);
  background: rgba(20, 20, 20, 0.6);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  margin: 10px auto;
  box-shadow: 0 20px 50px rgba(0,0,0,0.5);
  overflow: hidden;
  /* QO'SHILDI: Chat oynasi chiqish animatsiyasi */
  animation: fadeIn 0.5s ease forwards;
  opacity: 0;
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.98); }
  to { opacity: 1; transform: scale(1); }
}

.chat-sidebar { width: 380px; border-right: 1px solid rgba(255, 255, 255, 0.05); display: flex; flex-direction: column; padding: 24px 0; background: rgba(10, 10, 10, 0.4); }
.sidebar-header { padding: 0 24px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
.sidebar-header h3 { font-size: 20px; font-weight: 700; color: #fff; }
.search { padding: 0 24px; margin-bottom: 24px; }
.search input { width: 100%; padding: 12px 16px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 10px; color: white; outline: none; transition: all 0.3s; }
.search input:focus { border-color: rgba(255,255,255,0.3); box-shadow: 0 0 10px rgba(255,255,255,0.1); }
.search input::placeholder { color: #888; }
.chat-list-empty { padding: 0 24px; color: #888; font-size: 14px; margin-top: 20px; text-align: center; }
.chat-main { flex: 1; display: flex; align-items: center; justify-content: center; position: relative; }
.empty-state { text-align: center; max-width: 350px; color: #f5f5f5; z-index: 1; }
.icon-circle { width: 100px; height: 100px; border: 2px solid rgba(255, 255, 255, 0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; background: rgba(255, 255, 255, 0.02); transition: transform 0.3s; }
.icon-circle:hover { transform: scale(1.05) rotate(5deg); }
.empty-state h2 { font-size: 26px; font-weight: 300; margin-bottom: 12px; letter-spacing: 1px; }
.empty-state p { color: #999; font-size: 15px; margin-bottom: 24px; line-height: 1.5; }
.btn-primary { background: #ffffff; color: #000000; border: none; padding: 12px 24px; border-radius: 12px; font-weight: 700; font-size: 15px; cursor: pointer; transition: all 0.3s; box-shadow: 0 4px 15px rgba(255,255,255,0.2); }
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(255,255,255,0.4); background: #e6e6e6; }
.btn-primary:active { transform: scale(0.95); }

/* OQ REJIM */
body.light-theme .chat-layout { background: rgba(255, 255, 255, 0.8); border: 1px solid #dbdbdb; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
body.light-theme .chat-sidebar { background: rgba(250, 250, 250, 0.9); border-right: 1px solid #dbdbdb; }
body.light-theme .sidebar-header h3 { color: #000; }
body.light-theme .sidebar-header svg { stroke: #000; }
body.light-theme .search input { background: #efefef; border: 1px solid #dbdbdb; color: #000; }
body.light-theme .search input::placeholder { color: #888; }
body.light-theme .chat-list-empty { color: #888; }
body.light-theme .empty-state { color: #000; }
body.light-theme .empty-state h2 { color: #000; }
body.light-theme .empty-state p { color: #666; }
body.light-theme .icon-circle { border: 2px solid #262626; background: transparent; }
body.light-theme .icon-circle svg { stroke: #262626; }
body.light-theme .btn-primary { background: #0095f6; color: #fff; box-shadow: 0 4px 15px rgba(0,149,246,0.3); }
body.light-theme .btn-primary:hover { background: #1877f2; }
</style>