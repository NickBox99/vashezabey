import Vue from 'vue'
import { Smsc } from '@/services'
import { smscLogin, smscPassword } from '@/environment'

Vue.use({
  install(Vue, options) {
    Vue.prototype.$smsc = new Smsc(smscLogin, smscPassword);
  }
})
