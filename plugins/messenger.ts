import Vue from 'vue'
import { Messenger } from '@/services'
import { telegramApi } from '@/environment'

declare module 'vue/types/vue' {
  interface Vue {
    $messenger: Messenger
  }
}

Vue.prototype.$messenger = new Messenger(telegramApi);
