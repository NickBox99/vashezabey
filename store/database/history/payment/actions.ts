import Vue from "vue";
import { Database } from "~/types";

export default {
  async getAll({ dispatch }: Database.IStore): Promise<Database.History.IPayment[]> {
    return dispatch('cache/getUseCache', { key: 'historyPayment', fetchCallback: () => Vue.prototype.$fb.history.payment.getAll() }, { root: true })
  },

  async add({ commit }: Database.IStore, history: Database.History.IPayment) {
    const result: boolean = await Vue.prototype.$fb.history.payment.add(history);

    if (result) {
      commit('cache/add', { key: 'historyPayment', value: result }, { root: true });
      return true;
    }
    else {
      return false;
    }
  }
}
