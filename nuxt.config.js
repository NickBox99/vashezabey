export default {
  head: {
    title: 'Ваще Забей',
    htmlAttrs: {
      lang: 'ru'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Ваще Забей - это уникальный формат заведения, выполненный в индивидуально разработанном современном стиле' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  css: [
    'element-ui/lib/theme-chalk/index.css', '@/assets/css/main.scss'
  ],

  plugins: [
    '@/plugins/element-ui',
    '@/plugins/firebase',
    '@/plugins/directive.client',
    '@/plugins/smsc',
    '@/plugins/cryptoJS',
    '@/plugins/messenger'
  ],

  components: true,

  buildModules: [
    '@nuxt/typescript-build'
  ],

  modules: [
    'cookie-universal-nuxt'
  ],

  build: {
    transpile: [/^element-ui/]
  },

  rules: {

  },

  router: {
    middleware: 'auth'
  },

  env: {
    smsc: {
      login: process.env.SMSC_LOGIN,
      password: process.env.SMSC_PASSWORD
    },

    cryptoKey: process.env.CRYPTO_KEY,

    telegramApi: process.env.TELEGRAM_API,

    firebase: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.FIREBASE_DATABASE_URL,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID
    }
  }
}
