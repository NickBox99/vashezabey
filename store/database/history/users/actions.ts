import Vue, {h} from "vue";
import { Database, Smsc } from "~/types";
import { getPosElementDB } from "~/helpers";

export default {
  async getAll({ dispatch }: Database.IStore): Promise<Database.History.IUser[]> {
    return dispatch('cache/getUseCache', { key: 'historyUsers', fetchCallback: () => Vue.prototype.$fb.history.users.getAll() }, { root: true })
  },

  async add({ commit }: Database.IStore, history: Database.History.IUser) {
    const result: boolean = await Vue.prototype.$fb.history.users.add(history);

    if (result) {
      commit('cache/add', { key: 'historyUsers', value: result }, { root: true });
      return true;
    }
    else {
      return false;
    }
  }
}
