import Vue from 'vue'
import { Messenger } from '@/services'
import { telegramApi } from '@/environment'

Vue.use({
  install(Vue) {
    Vue.prototype.$messenger = new Messenger(telegramApi);
  }
})
