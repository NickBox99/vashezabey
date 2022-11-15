import { Database } from "~/types";

export default {
  getAll(state, getters, rootState, rootGetters): Database.IPlace[] {
    return rootGetters['cache/get']('places');
  }
}
