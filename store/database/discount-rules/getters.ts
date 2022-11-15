import { Database } from "~/types";

export default {
  getAll(state, getters, rootState, rootGetters): Database.IDiscountRule[] {
    return rootGetters['cache/get']('discount-rules');
  }
}
