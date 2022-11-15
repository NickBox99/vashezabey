import Vue from "vue";
import { Auth } from "~/types";

export default {
  async login({ dispatch, commit }: Auth.IStore, phone: string) {
    const user = await dispatch('database/users/getByPhone', phone, { root: true });
    if (user) {
      commit('setUser', user);
      //@ts-ignore
      this.$cookies.set('uid', Vue.prototype.$crypto.encrypt(phone), {
        path: '/',
        maxAge: 2500000
      });

      return true;
    }

    return false;
  },

  async initAuth({ dispatch }: Auth.IStore): Promise<boolean> {//@ts-ignore
    const uid = this.$cookies.get('uid');

    if (uid) {
      return await dispatch('login', Vue.prototype.$crypto.decrypt(uid));
    }

    return false;
  },
}
