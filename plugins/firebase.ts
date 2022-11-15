import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import Vue from 'vue'
import { Firebase } from '@/services'
import { firebaseKey as apiKey } from "@/environment"

const firebaseConfig = {
  apiKey,
  authDomain: "vashezabei-cdf19.firebaseapp.com",
  databaseURL: "https://vashezabei-cdf19-default-rtdb.firebaseio.com",
  projectId: "vashezabei-cdf19",
  storageBucket: "vashezabei-cdf19.appspot.com",
  messagingSenderId: "35486108826",
  appId: "1:35486108826:web:e890da127d51c8a7e62323"
};

const app = initializeApp(firebaseConfig);
getStorage(app);

Vue.use({
  install(Vue, options) {
    Vue.prototype.$fb = new Firebase;
  }
})
