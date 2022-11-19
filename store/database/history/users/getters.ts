import { Database } from "~/types";

export default {
  getAll(state, getters, rootState, rootGetters): Database.History.IUser[] {
    return rootGetters['cache/get']('historyUsers');
  }
}
