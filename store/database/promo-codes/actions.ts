import { Database } from "~/types";
import Vue from "vue";
import {getPosElementDB} from "~/helpers";

export default {
  async getAll({ dispatch }: Database.IStore): Promise<Database.IPromoCode[]> {
    return dispatch('cache/getUseCache', { key: 'promo-codes', fetchCallback: () => Vue.prototype.$fb.promoCodes.getAll() }, { root: true })
  },

  async getById({ dispatch }: Database.IStore, id: string): Promise<Database.IPromoCode | undefined> {
    const promoCodes: Database.IPromoCode[] = await dispatch('getAll');
    return promoCodes.find(promoCode => promoCode.id === id);
  },

  async add({ commit }: Database.IStore, promoCode: Database.IPromoCode) {
    commit('cache/add', { key: 'promo-codes', value: await Vue.prototype.$fb.promoCodes.add(promoCode) }, { root: true });
  },

  async update({ commit, dispatch }: Database.IStore, promoCode: Database.IPromoCode) {
    const findPromoCode = await dispatch('getById', promoCode.id);

    if (!findPromoCode) {
      return false;
    }

    const newPromoCode = { ...findPromoCode, ...promoCode };
    commit('cache/update', { key: 'promo-codes', value: newPromoCode}, { root: true });
    Vue.prototype.$fb.promoCodes.update(newPromoCode);
    return true;
  },

  async remove({ commit }: Database.IStore, id: string) {
    await Vue.prototype.$fb.promoCodes.remove(id);
    commit('cache/remove', { key: 'promo-codes', id }, { root: true });
  },

  async move({ dispatch }, { el, newPos }) {
    const pos = getPosElementDB(await dispatch('getAll'), newPos, el);

    if (!pos) {
      return false;
    }

    return dispatch('update', { id: el.id, pos })
  }
}
