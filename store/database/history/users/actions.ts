import Vue, {h} from "vue";
import { Database, Smsc } from "~/types";
import { getPosElementDB } from "~/helpers";

export default {
  async getAll({ dispatch }: Database.IStore): Promise<Database.History.INavigation[]> {
    return dispatch('cache/getUseCache', { key: 'historyNavigations', fetchCallback: () => Vue.prototype.$fb.history.navigations.getAll() }, { root: true })
  },

  async add({ commit }: Database.IStore, history: Database.History.INavigation) {
    const result: boolean = await Vue.prototype.$fb.history.navigations.add(history);

    if (result) {
      commit('cache/add', { key: 'historyNavigations', value: result }, { root: true });
      return true;
    }
    else {
      return false;
    }
  }
}
