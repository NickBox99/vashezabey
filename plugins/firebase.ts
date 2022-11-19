import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import Vue from 'vue'
import { Firebase } from '@/services'
import { firebase } from "@/environment"

const app = initializeApp(firebase);
getStorage(app);

Vue.use({
  install(Vue, options) {
    Vue.prototype.$fb = new Firebase;
  }
})
