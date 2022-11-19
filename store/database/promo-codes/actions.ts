import Vue from "vue";
import { Database } from "~/types";
import { getPosElementDB } from "~/helpers";

export default {
  async getAll({ dispatch }: Database.IStore): Promise<Database.IPromoCode[]> {
    return dispatch('cache/getUseCache', { key: 'promoCodes', fetchCallback: () => Vue.prototype.$fb.promoCodes.getAll() }, { root: true })
  },

  async getById({ dispatch }: Database.IStore, id: string): Promise<Database.IPromoCode | undefined> {
    const promoCodes: Database.IPromoCode[] = await dispatch('getAll');
    return promoCodes.find(promoCode => promoCode.id === id);
  },

  async add({ commit }: Database.IStore, promoCode: Database.IPromoCode) {
    const result: Database.IPromoCode = await Vue.prototype.$fb.promoCodes.add(promoCode);

    if (result) {
      commit('cache/add', { key: 'promoCodes', value: result }, { root: true });
      return true;
    }
    else {
      return false;
    }
  },

  async update({ commit, dispatch }: Database.IStore, promoCode: Database.IPromoCode) {
    const findPromoCode: Database.IPromoCode = await dispatch('getById', promoCode.id);

    if (!findPromoCode) {
      return false;
    }

    const newPromoCode = { ...findPromoCode, ...promoCode };
    commit('cache/update', { key: 'promoCodes', value: newPromoCode}, { root: true });
    await Vue.prototype.$fb.promoCodes.update(newPromoCode);
    return true;
  },

  async remove({ commit }: Database.IStore, id: string) {
    await Vue.prototype.$fb.promoCodes.remove(id);
    commit('cache/remove', { key: 'promoCodes', id }, { root: true });
    return true;
  },

  async move({ dispatch }, { el, newPos }) {
    const pos = getPosElementDB(await dispatch('getAll'), newPos, el);

    if (!pos) {
      return false;
    }

    return dispatch('update', { id: el.id, pos });
  }
}
