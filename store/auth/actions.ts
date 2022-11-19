import Vue from "vue";
import { Auth, Database } from "~/types";
import { NuxtCookies } from "cookie-universal-nuxt";


export default {
  async login({ dispatch, commit }: Auth.IStore, phone: string) {
    const user: Database.IUser = await dispatch('database/users/getByPhone', phone, { root: true });
    if (user) {
      commit('setUser', user);

      (this as unknown as {
        $cookies: NuxtCookies
      }).$cookies.set('uid', Vue.prototype.$crypto.encrypt(phone), {
        path: '/',
        maxAge: 2500000
      });

      return true;
    }

    return false;
  },

  async initAuth({ dispatch }: Auth.IStore): Promise<boolean> {
    const uid = (this as unknown as {
      $cookies: NuxtCookies
    }).$cookies.get('uid');

    if (uid) {
      return await dispatch('login', Vue.prototype.$crypto.decrypt(uid));
    }

    return false;
  },

  logout() {}
}
