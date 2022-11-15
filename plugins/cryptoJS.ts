import Vue from 'vue'
import { CryptoJS } from '@/services'
import { cryptoKey } from '@/environment'

Vue.use({
  install(Vue, options) {
    Vue.prototype.$crypto = new CryptoJS(cryptoKey);
  }
})
