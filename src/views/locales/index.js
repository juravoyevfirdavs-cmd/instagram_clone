// frontend/src/locales/index.js
import { createI18n } from 'vue-i18n'

const messages = {
  uz: {
    nav: {
      home: 'Bosh sahifa',
      reels: 'Reels',
      messages: 'Xabarlar',
      notifications: 'Bildirishnomalar',
      create: 'Yaratish',
      profile: 'Profil',
      settings: 'Yana (Sozlamalar)'
    },
    settings: {
      title: 'Sozlamalar',
      theme: 'Mavzu',
      themeDesc: 'Qorong\'u yoki yorug\' mavzuni tanlang',
      darkTheme: 'Qorong\'u mavzu',
      lightTheme: 'Yorug\' mavzu',
      language: 'Ilova tili',
      langDesc: 'Interfeys tilini tanlang',
      private: 'Yopiq akkaunt',
      privateDesc: 'Postlaringizni begonalardan yashiring',
      notifications: 'Bildirishnomalar',
      notifDesc: 'Layk va izohlar haqida xabar oling',
      account: 'Akkaunt',
      accountDesc: 'Profil va parolni o\'zgartirish',
      edit: 'O\'zgartirish',
      logout: 'Akkauntdan chiqish'
    },
    chat: {
      title: 'Xabarlaringiz',
      desc: 'Do\'stlaringiz yoki guruhlarga shaxsiy xabarlar yuboring.',
      btn: 'Xabar yuborish',
      search: 'Qidiruv',
      empty: 'Xabarlar shu yerda paydo bo\'ladi'
    },
    notifications: {
      title: 'Bildirishnomalar',
      all: 'Hammasi',
      follows: 'Obunalar',
      comments: 'Izohlar'
    }
  },
  ru: {
    nav: {
      home: 'Главная',
      reels: 'Reels',
      messages: 'Сообщения',
      notifications: 'Уведомления',
      create: 'Создать',
      profile: 'Профиль',
      settings: 'Ещё (Настройки)'
    },
    settings: {
      title: 'Настройки',
      theme: 'Тема оформления',
      themeDesc: 'Выберите темную или светлую тему',
      darkTheme: 'Темная тема',
      lightTheme: 'Светлая тема',
      language: 'Язык приложения',
      langDesc: 'Выберите язык интерфейса',
      private: 'Закрытый аккаунт',
      privateDesc: 'Скрыть ваши публикации от посторонних',
      notifications: 'Уведомления',
      notifDesc: 'Получать уведомления о лайках и комментариях',
      account: 'Аккаунт',
      accountDesc: 'Изменить профиль, пароль',
      edit: 'Изменить',
      logout: 'Выйти из аккаунта'
    },
    chat: {
      title: 'Ваши сообщения',
      desc: 'Отправляйте личные фото и сообщения другу или группе.',
      btn: 'Отправить сообщение',
      search: 'Поиск',
      empty: 'Chats will appear here'
    },
    notifications: {
      title: 'Уведомления',
      all: 'Все',
      follows: 'Подписки',
      comments: 'Комментарии'
    }
  },
  en: {
    nav: {
      home: 'Home',
      reels: 'Reels',
      messages: 'Messages',
      notifications: 'Notifications',
      create: 'Create',
      profile: 'Profile',
      settings: 'More (Settings)'
    },
    settings: {
      title: 'Settings',
      theme: 'Theme',
      themeDesc: 'Choose dark or light theme',
      darkTheme: 'Dark Theme',
      lightTheme: 'Light Theme',
      language: 'App Language',
      langDesc: 'Select interface language',
      private: 'Private Account',
      privateDesc: 'Hide your posts from strangers',
      notifications: 'Notifications',
      notifDesc: 'Get notified about likes and comments',
      account: 'Account',
      accountDesc: 'Change profile, password',
      edit: 'Edit',
      logout: 'Log out'
    },
    chat: {
      title: 'Your messages',
      desc: 'Send private photos and messages to a friend or group.',
      btn: 'Send message',
      search: 'Search',
      empty: 'Chats will appear here'
    },
    notifications: {
      title: 'Notifications',
      all: 'All',
      follows: 'Follows',
      comments: 'Comments'
    }
  }
}

const savedLang = localStorage.getItem('language') || 'uz'

const i18n = createI18n({
  locale: savedLang,
  fallbackLocale: 'en',
  messages,
})

export default i18n