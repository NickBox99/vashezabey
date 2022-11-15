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

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'cookie-universal-nuxt'
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/]
  },

  rules: {

  },

  env: {
    smscLogin: process.env.SMSC_LOGIN,
    smscPassword: process.env.SMSC_PASSWORD,

    cryptoKey: process.env.CRYPTO_KEY,

    telegramApi: process.env.TELEGRAM_API,

    firebaseKey: process.env.FIREBASE_KEY
  }
}
