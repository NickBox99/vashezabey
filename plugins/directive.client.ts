import Vue from 'vue';
import IMask from "imask";

Vue.directive('mask-phone', {
  inserted: el => {
    IMask(el.querySelector('input') as HTMLElement, { mask: '+{7} (000) 000-00-00' });
  }
})
