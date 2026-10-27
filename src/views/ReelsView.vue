<template>
  <div class="reels-page">
    <!-- Video qo'shish tugmasi -->
    <div class="add-reel-btn" @click="showAddModal = true">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
      Video Qo'shish
    </div>

    <!-- Videolar ro'yxati -->
    <div class="reels-container">
      <div v-if="reels.length === 0" class="empty-state">
        Hozircha videolar yo'q. Birinchi bo'lib qo'shing!
      </div>

      <!-- Har bir video uchun kartochka -->
      <div class="reel-card" v-for="reel in reels" :key="reel._id">
        <video 
          :src="reel.videoUrl" 
          class="reel-video" 
          autoplay loop muted playsinline
          @click="togglePlay($event)"
        ></video>
        
        <!-- Video ustidagi ma'lumotlar -->
        <div class="reel-overlay">
          <div class="user-info">
            <img :src="reel.user.profilePic || defaultAvatar" class="avatar" />
            <span class="username">@{{ reel.user.username }}</span>
            <button class="follow-btn">Подписаться</button>
          </div>
          <p class="caption">{{ reel.caption }}</p>
          <div class="music">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
            Original Audio
          </div>
        </div>

        <!-- Yon panel (Like, Comment) -->
        <div class="reel-actions">
          <div class="action-btn">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            <span>{{ reel.likes?.length || 0 }}</span>
          </div>
          <div class="action-btn">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
            <span>{{ reel.comments?.length || 0 }}</span>
          </div>
          <div class="action-btn">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL: Video Qo'shish -->
    <div v-if="showAddModal" class="modal-overlay" @click.self="showAddModal = false">
      <div class="modal-content">
        <h2>Yangi Reels Qo'shish</h2>
        <input v-model="newReel.url" type="text" placeholder="Video URL manzilini kiriting (mp4)" class="input-field" />
        <input v-model="newReel.caption" type="text" placeholder="Video izohi (Caption)" class="input-field" />
        <div class="modal-actions">
          <button class="btn-cancel" @click="showAddModal = false">Bekor qilish</button>
          <button class="btn-submit" @click="submitReel">Yuklash</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import http from '../api/http';

const reels = ref([]);
const defaultAvatar = 'https://via.placeholder.com/150';
const showAddModal = ref(false);
const newReel = ref({ url: '', caption: '' });

// Videolarni yuklash
const fetchReels = async () => {
  try {
    const res = await http.get('/reels');
    reels.value = res.data;
  } catch (err) {
    console.error("Videolarni yuklashda xato:", err);
    // Test uchun namuna
    reels.value = [
      { _id: '1', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', caption: 'Test video #1', user: { username: 'firdavs', profilePic: '' }, likes: [], comments: [] }
    ];
  }
};

onMounted(() => {
  fetchReels();
});

// Video qo'shish
const submitReel = async () => {
  if (!newReel.value.url) return alert("Video URL kiriting!");
  try {
    const res = await http.post('/reels', {
      videoUrl: newReel.value.url,
      caption: newReel.value.caption
    });
    reels.value.unshift(res.data); // Ro'yxat boshiga qo'shish
    showAddModal.value = false;
    newReel.value = { url: '', caption: '' };
  } catch (err) {
    console.error(err);
    alert("Xatolik yuz berdi. Backend ishlayaptimi?");
  }
};

// Videoni to'xtatish yoki qo'yish
const togglePlay = (e) => {
  if (e.target.paused) e.target.play();
  else e.target.pause();
};
</script>

<style scoped>
.reels-page { width: 100%; height: 100vh; overflow-y: scroll; scroll-snap-type: y mandatory; background: #000; position: relative; }
.reels-page::-webkit-scrollbar { display: none; }

.add-reel-btn {
  position: fixed; top: 20px; right: 20px; z-index: 1000;
  background: #0095f6; color: white; padding: 10px 20px; border-radius: 20px;
  display: flex; align-items: center; gap: 8px; font-weight: 600; cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 149, 246, 0.4);
}

.reels-container { display: flex; flex-direction: column; align-items: center; }

.reel-card {
  height: 100vh; width: 100%; max-width: 450px; scroll-snap-align: start;
  position: relative; display: flex; align-items: center; justify-content: center;
  border-bottom: 1px solid #222;
}

.reel-video { width: 100%; height: 100%; object-fit: cover; cursor: pointer; }

.reel-overlay {
  position: absolute; bottom: 20px; left: 20px; right: 80px; color: white;
  text-shadow: 1px 1px 5px rgba(0,0,0,0.8);
}
.user-info { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
.avatar { width: 32px; height: 32px; border-radius: 50%; border: 1px solid white; }
.username { font-weight: 600; font-size: 14px; }
.follow-btn { background: transparent; border: 1px solid white; color: white; padding: 4px 12px; border-radius: 4px; font-size: 12px; margin-left: 8px; cursor: pointer; }
.caption { font-size: 14px; margin-bottom: 10px; line-height: 1.4; }
.music { display: flex; align-items: center; gap: 8px; font-size: 12px; }

.reel-actions { position: absolute; right: 15px; bottom: 30px; display: flex; flex-direction: column; gap: 24px; }
.action-btn { display: flex; flex-direction: column; align-items: center; color: white; cursor: pointer; }
.action-btn span { font-size: 12px; margin-top: 4px; font-weight: 600; }

.empty-state { color: #888; text-align: center; margin-top: 50vh; }

/* Modal dizayni */
.modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); display: flex; justify-content: center; align-items: center; z-index: 2000; }
.modal-content { background: #262626; padding: 30px; border-radius: 12px; width: 400px; border: 1px solid #444; }
.modal-content h2 { margin-bottom: 20px; color: #fff; font-weight: 500; }
.input-field { width: 100%; padding: 12px; background: #121212; border: 1px solid #363636; color: #fff; border-radius: 8px; margin-bottom: 15px; outline: none; }
.modal-actions { display: flex; justify-content: flex-end; gap: 10px; }
.btn-cancel { background: transparent; color: #fff; border: none; cursor: pointer; font-weight: bold; }
.btn-submit { background: #0095f6; color: white; border: none; padding: 10px 20px; border-radius: 8px; font-weight: bold; cursor: pointer; }
</style>