import Vue from "vue";
import { Database } from "~/types";
import { getPosElementDB } from "@/helpers"

export default {
  async getAll({ dispatch }: Database.IStore): Promise<Database.History.IPayment[]> {
    return dispatch('cache/getUseCache', { key: 'historyPayment', fetchCallback: () => Vue.prototype.$fb.history.payment.getAll() }, { root: true })
  }
}
