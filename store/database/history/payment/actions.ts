import Vue from "vue";
import { Database } from "~/types";

export default {
  async getAll({ dispatch }: Database.IStore): Promise<Database.History.IPayment[]> {
    return dispatch('cache/getUseCache', { key: 'historyPayment', fetchCallback: () => Vue.prototype.$fb.history.payment.getAll() }, { root: true })
  },

  async add({ commit, rootGetters }: Database.IStore, { accumulated, id }: Database.IUser) {
    const result: boolean = await Vue.prototype.$fb.history.payment.add({
      id: null!,
      summa: accumulated,
      clientId: id,
      dateTime: Date.now(),
      placeId: rootGetters["settings/getId"],
      userId: rootGetters["auth/getUserId"]
    } as Database.History.IPayment);

    if (result) {
      commit('cache/add', { key: 'historyPayment', value: result }, { root: true });
      return true;
    }
    else {
      return false;
    }
  }
}
