<template>
  <div class="search-page">
    <div class="search-header">
      <div class="search-input-wrapper">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a8a8a8" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <input 
          v-model="query" 
          @input="handleSearch" 
          type="text" 
          placeholder="Odamlarni qidirish..." 
          class="search-input"
        />
      </div>
    </div>

    <div class="search-results">
      <div v-if="loading" class="loading">Qidirilmoqda...</div>
      
      <div v-else-if="results.length === 0 && query" class="no-results">
        "{{ query }}" bo'yicha hech narsa topilmadi.
      </div>

      <div 
        v-for="user in results" 
        :key="user._id" 
        class="user-card"
        @click="startChat(user)"
      >
        <img :src="user.profilePic || defaultAvatar" class="avatar" />
        <div class="user-info">
          <span class="username">{{ user.username }}</span>
          <span class="fullname">{{ user.fullName || 'Foydalanuvchi' }}</span>
        </div>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import http from '../api/http';
import { useChatStore } from '../stores/chat';

const query = ref('');
const results = ref([]);
const loading = ref(false);
const defaultAvatar = 'https://via.placeholder.com/150';
const router = useRouter();
const chatStore = useChatStore();

// Debounce funksiyasi (har bir harf bosilganda API ga so'rov ketmasligi uchun)
let timeout = null;
const handleSearch = () => {
  clearTimeout(timeout);
  if (!query.value.trim()) {
    results.value = [];
    return;
  }
  
  loading.value = true;
  timeout = setTimeout(async () => {
    try {
      const res = await http.get(`/auth/search?query=${query.value}`);
      results.value = res.data;
    } catch (err) {
      console.error("Qidiruvda xato:", err);
      // Test uchun namuna
      results.value = [
        { _id: '1', username: 'firdavs_dev', fullName: 'Firdavs' },
        { _id: '2', username: 'test_user', fullName: 'Test User' }
      ];
    } finally {
      loading.value = false;
    }
  }, 500); // 500ms kutish
};

// Foydalanuvchini bosganda chat ochish
const startChat = (user) => {
  if (chatStore.createChat) {
    chatStore.createChat(user._id);
  }
  router.push('/chat'); // Chat sahifasiga o'tish
};
</script>

<style scoped>
.search-page {
  width: 100%;
  max-width: 600px;
  padding-top: 40px;
  color: #fff;
}

.search-header {
  margin-bottom: 30px;
}

.search-input-wrapper {
  display: flex;
  align-items: center;
  background: #262626;
  padding: 12px 20px;
  border-radius: 12px;
  border: 1px solid #363636;
}

.search-input {
  background: transparent;
  border: none;
  color: white;
  width: 100%;
  margin-left: 12px;
  outline: none;
  font-size: 16px;
}

.user-card {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
}

.user-card:hover {
  background: #1a1a1a;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 16px;
}

.user-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.username {
  font-weight: 600;
  font-size: 16px;
}

.fullname {
  color: #a8a8a8;
  font-size: 14px;
}

.loading, .no-results {
  text-align: center;
  color: #888;
  margin-top: 40px;
}
</style>