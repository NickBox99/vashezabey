import { Database } from "~/types";

export default {
  getAll(state, getters, rootState, rootGetters): Database.IRule[] {
    return rootGetters['cache/get']('rules');
  }
}
