import { Database } from "~/types";
import Vue from "vue";
import {getPosElementDB} from "~/helpers";

export default {
  async getAll({ dispatch }: Database.IStore): Promise<Database.IDiscountRule[]> {
    return dispatch('cache/getUseCache', { key: 'discount-rules', fetchCallback: () => Vue.prototype.$fb.discountRules.getAll() }, { root: true })
  },

  async getById({ dispatch }: Database.IStore, id: string): Promise<Database.IDiscountRule | undefined> {
    const discountRules: Database.IDiscountRule[] = await dispatch('getAll');
    return discountRules.find(discountRule => discountRule.id === id);
  },

  async add({ commit }: Database.IStore, discountRule: Database.IDiscountRule) {
    commit('cache/add', { key: 'discount-rules', value: await Vue.prototype.$fb.discountRules.add(discountRule) }, { root: true });
  },

  async update({ commit, dispatch }: Database.IStore, discountRule: Database.IDiscountRule) {
    const findDiscountRule = await dispatch('getById', discountRule.id);

    if (!findDiscountRule) {
      return false;
    }

    const newDiscountRule = { ...findDiscountRule, ...discountRule };
    commit('cache/update', { key: 'discount-rules', value: newDiscountRule}, { root: true });
    Vue.prototype.$fb.discountRules.update(newDiscountRule);
    return true;
  },

  async remove({ commit }: Database.IStore, id: string) {
    await Vue.prototype.$fb.discountRules.remove(id);
    commit('cache/remove', { key: 'discount-rules', id }, { root: true });
  },

  async move({ dispatch }, { el, newPos }) {
    const pos = getPosElementDB(await dispatch('getAll'), newPos, el);

    if (!pos) {
      return false;
    }

    return dispatch('update', { id: el.id, pos })
  }
}
