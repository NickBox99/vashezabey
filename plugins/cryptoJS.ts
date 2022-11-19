import Vue from 'vue'
import { CryptoJS } from '@/services'
import { cryptoKey } from '@/environment'

declare module 'vue/types/vue' {
  interface Vue {
    $crypto: CryptoJS
  }
}

Vue.prototype.$crypto = new CryptoJS(cryptoKey);
