<template>
  <div class="settings-page">
    <h2>Настройки</h2>
    
    <!-- 1. Mavzu (Tema) -->
    <div class="setting-card">
      <div class="setting-info">
        <h3>Тема оформления</h3>
        <p>Выберите темную или светлую тему</p>
      </div>
      <button class="theme-btn" @click="toggleTheme">
        <span class="theme-icon" :class="{ 'rotate-icon': isLight }">
          {{ isLight ? '🌙' : '☀️' }}
        </span>
        {{ isLight ? 'Темная тема' : 'Светлая тема' }}
      </button>
    </div>

    <!-- 2. Tilni o'zgartirish (YANGI) -->
    <div class="setting-card">
      <div class="setting-info">
        <h3>Язык приложения</h3>
        <p>Выберите язык интерфейса</p>
      </div>
      <select v-model="selectedLanguage" class="lang-select">
        <option value="uz">🇺🇿 O'zbekcha</option>
        <option value="ru">🇷🇺 Русский</option>
        <option value="en">🇬🇧 English</option>
      </select>
    </div>

    <!-- 3. Maxfiy akkaunt (YANGI) -->
    <div class="setting-card">
      <div class="setting-info">
        <h3>Закрытый аккаунт</h3>
        <p>Скрыть ваши публикации от посторонних</p>
      </div>
      <label class="switch">
        <input type="checkbox" v-model="isPrivate">
        <span class="slider round"></span>
      </label>
    </div>

    <!-- 4. Bildirishnomalar (YANGI) -->
    <div class="setting-card">
      <div class="setting-info">
        <h3>Уведомления</h3>
        <p>Получать уведомления о лайках и комментариях</p>
      </div>
      <label class="switch">
        <input type="checkbox" v-model="notificationsEnabled">
        <span class="slider round"></span>
      </label>
    </div>

    <!-- 5. Akkauntni tahrirlash (Mavjud) -->
    <div class="setting-card">
      <div class="setting-info">
        <h3>Аккаунт</h3>
        <p>Изменить профиль, пароль</p>
      </div>
      <button class="save-btn">Изменить</button>
    </div>
    
    <!-- 6. Chiqish (Mavjud) -->
    <button class="logout-btn" @click="logout">Выйти из аккаунта</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isLight = ref(false);

// YANGI: Qo'shimcha sozlamalar uchun o'zgaruvchilar
const selectedLanguage = ref('uz');
const isPrivate = ref(false);
const notificationsEnabled = ref(true);

onMounted(() => {
  isLight.value = document.body.classList.contains('light-theme');
  
  // Xotiradan saqlangan sozlamalarni yuklash
  const savedLang = localStorage.getItem('language');
  if (savedLang) selectedLanguage.value = savedLang;
  
  const savedPrivate = localStorage.getItem('isPrivate');
  if (savedPrivate) isPrivate.value = savedPrivate === 'true';
  
  const savedNotif = localStorage.getItem('notifications');
  if (savedNotif) notificationsEnabled.value = savedNotif === 'true';
});

const toggleTheme = () => {
  isLight.value = !isLight.value;
  if (isLight.value) {
    document.body.classList.add('light-theme');
    localStorage.setItem('theme', 'light');
  } else {
    document.body.classList.remove('light-theme');
    localStorage.setItem('theme', 'dark');
  }
};

const logout = () => {
  localStorage.removeItem('token');
  router.push('/login');
};
</script>

<style scoped>
.settings-page {
  width: 100%;
  max-width: 600px;
  padding: 40px 20px;
  color: #fff;
  animation: slideUp 0.5s ease forwards;
  opacity: 0;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

h2 { margin-bottom: 30px; font-weight: 500; }

.setting-card { 
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  padding: 20px; 
  background: #121212; 
  border: 1px solid #262626; 
  border-radius: 12px; 
  margin-bottom: 16px; 
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.setting-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.3);
}

.setting-info h3 { margin: 0 0 5px 0; font-size: 16px; }
.setting-info p { margin: 0; color: #a8a8a8; font-size: 13px; }

.theme-btn, .save-btn { 
  background: #262626; 
  color: #fff; 
  border: 1px solid #363636; 
  padding: 10px 16px; 
  border-radius: 8px; 
  cursor: pointer; 
  font-weight: 600; 
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.theme-btn:hover, .save-btn:hover {
  background: #363636;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
.theme-btn:active, .save-btn:active, .logout-btn:active {
  transform: scale(0.95);
}

/* QO'SHILDI: IKONKA AYLANISH ANIMATSIYASI */
.theme-icon {
  display: inline-block;
  transition: transform 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}
.theme-icon.rotate-icon {
  transform: rotate(360deg);
}

/* YANGI: Til tanlash (Select) dizayni */
.lang-select {
  background: #262626;
  color: #fff;
  border: 1px solid #363636;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  outline: none;
  font-weight: 600;
}

/* YANGI: Switch (O'chirib-yoqish) tugmasi dizayni */
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 26px;
}
.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: #363636;
  transition: .4s;
}
.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
}
input:checked + .slider {
  background-color: #0095f6;
}
input:checked + .slider:before {
  transform: translateX(24px);
}
.slider.round {
  border-radius: 34px;
}
.slider.round:before {
  border-radius: 50%;
}

.logout-btn { 
  width: 100%; 
  background: transparent; 
  color: #ed4956; 
  border: 1px solid #ed4956; 
  padding: 12px; 
  border-radius: 8px; 
  margin-top: 20px; 
  cursor: pointer; 
  font-weight: 600; 
  transition: all 0.3s;
}
.logout-btn:hover { background: rgba(237, 73, 86, 0.1); }

/* OQ REJIM */
body.light-theme .settings-page { color: #000; }
body.light-theme h2 { color: #000; }
body.light-theme .setting-card {
  background: #ffffff;
  border: 1px solid #dbdbdb;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}
body.light-theme .setting-info h3 { color: #000; }
body.light-theme .setting-info p { color: #666; }
body.light-theme .theme-btn, body.light-theme .save-btn {
  background: #efefef;
  color: #000;
  border: 1px solid #dbdbdb;
}
body.light-theme .theme-btn:hover, body.light-theme .save-btn:hover {
  background: #dbdbdb;
}
body.light-theme .logout-btn { color: #ed4956; border: 1px solid #ed4956; }

/* YANGI: Oq rejimda Select va Switch dizayni */
body.light-theme .lang-select {
  background: #efefef;
  color: #000;
  border: 1px solid #dbdbdb;
}
body.light-theme .slider {
  background-color: #ccc;
}
</style>