import { Database } from "~/types";

export default {
  getAll(state, getters, rootState, rootGetters): Database.ICategory[] {
    return rootGetters['cache/get']('categories-beverages-juices');
  }
}
