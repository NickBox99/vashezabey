import Vue from "vue";
import { Database } from "~/types";
import { getPosElementDB } from "@/helpers"

export default {
  async getAll({ dispatch }: Database.IStore): Promise<Database.History.IUser[]> {
    return dispatch('cache/getUseCache', { key: 'historyUsers', fetchCallback: () => Vue.prototype.$fb.history.users.getAll() }, { root: true })
  }
}
