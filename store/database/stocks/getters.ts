import { Database } from "~/types";

export default {
  getAll(state, getters, rootState, rootGetters): Database.IStock[] {
    return rootGetters['cache/get']('stocks');
  }
}
