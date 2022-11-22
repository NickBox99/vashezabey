import Vue from "vue";
import { Database } from "~/types";
import { getPosElementDB } from "@/helpers"

export default {
  async getAll({ dispatch }: Database.IStore): Promise<Database.History.INavigation[]> {
    return dispatch('cache/getUseCache', { key: 'statisticsNavigation', fetchCallback: () => Vue.prototype.$fb.history.navigations.getAll() }, { root: true })
  }
}
