import Vue from 'vue'
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { Firebase } from '@/services'
import { firebase } from "@/environment"

declare module 'vue/types/vue' {
  interface Vue {
    $fb: Firebase
  }
}

const app = initializeApp(firebase);
getStorage(app);

Vue.prototype.$fb = new Firebase;
