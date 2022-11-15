import { Database } from "~/types";

export default {
  getAll(state, getters, rootState, rootGetters): Database.IPromoCode[] {
    return rootGetters['cache/get']('promo-codes');
  }
}
