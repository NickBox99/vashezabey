import { Database } from "~/types";

export default {
  getAll(state, getters, rootState, rootGetters): Database.History.INavigation[] {
    return rootGetters['cache/get']('statisticsNavigation');
  }
}
