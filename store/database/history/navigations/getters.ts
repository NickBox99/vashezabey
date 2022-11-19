import { Database } from "~/types";

export default {
  getAll(state, getters, rootState, rootGetters): Database.IUser[] {
    return rootGetters['cache/get']('users');
  }
}
