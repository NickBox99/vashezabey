import Vue from "vue";
import { Database } from "~/types";

export default {
  async getAll({ dispatch }: Database.IStore): Promise<Database.History.INavigation[]> {
    return dispatch('cache/getUseCache', { key: 'historyNavigations', fetchCallback: () => Vue.prototype.$fb.history.navigations.getAll() }, { root: true })
  },

  async add({ commit, rootGetters }: Database.IStore, routeName: keyof Database.History.INavigationType) {
    const result: boolean = await Vue.prototype.$fb.history.navigations.add({
      id: null!,
      type: Database.History.INavigationType[routeName],
      dateTime: Date.now(),
      placeId: rootGetters["settings/getId"],
      userId: rootGetters["auth/getUserId"]
    } as Database.History.INavigation);

    if (result) {
      commit('cache/add', { key: 'historyNavigations', value: result }, { root: true });
      return true;
    }
    else {
      return false;
    }
  }
}
