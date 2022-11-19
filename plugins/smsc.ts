import Vue from 'vue'
import { Smsc } from '@/services'
import { smsc } from '@/environment'

Vue.use({
  install(Vue, options) {
    Vue.prototype.$smsc = new Smsc(smsc.login, smsc.password);
  }
})
