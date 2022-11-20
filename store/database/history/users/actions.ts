import Vue from "vue";
import { Database } from "~/types";

export default {
  async getAll({ dispatch }: Database.IStore): Promise<Database.History.IUser[]> {
    return dispatch('cache/getUseCache', { key: 'historyUsers', fetchCallback: () => Vue.prototype.$fb.history.users.getAll() }, { root: true })
  },

  async add({ commit, rootGetters }: Database.IStore, type: Database.History.IUserType) {
    const result: boolean = await Vue.prototype.$fb.history.users.add({
      id: null!,
      type,
      dateTime: Date.now(),
      placeId: rootGetters["settings/getId"],
      userId: rootGetters["auth/getUserId"]
    } as Database.History.IUser);

    if (result) {
      commit('cache/add', { key: 'historyUsers', value: result }, { root: true });
      return true;
    }
    else {
      return false;
    }
  }
}
