import Vue from 'vue'
import { Smsc } from '@/services'
import { smsc } from '@/environment'

declare module 'vue/types/vue' {
  interface Vue {
    $smsc: Smsc
  }
}

Vue.prototype.$smsc = new Smsc(smsc.login, smsc.password);
