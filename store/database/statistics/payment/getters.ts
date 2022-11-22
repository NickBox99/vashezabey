import { Database } from "~/types";

export default {
  getAll(state, getters, rootState, rootGetters): Database.History.IPayment[] {
    return rootGetters['cache/get']('historyPayment');
  }
}
