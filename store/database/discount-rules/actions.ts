import Vue from "vue";
import { Database } from "~/types";
import { getPosElementDB } from "~/helpers";

export default {
  async getAll({ dispatch }: Database.IStore): Promise<Database.IDiscountRule[]> {
    return dispatch('cache/getUseCache', { key: 'discountRules', fetchCallback: () => Vue.prototype.$fb.discountRules.getAll() }, { root: true })
  },

  async getById({ dispatch }: Database.IStore, id: string): Promise<Database.IDiscountRule | undefined> {
    const discountRules: Database.IDiscountRule[] = await dispatch('getAll');
    return discountRules.find(discountRule => discountRule.id === id);
  },

  async add({ commit }: Database.IStore, discountRule: Database.IDiscountRule) {
    const result: Database.IDiscountRule = await Vue.prototype.$fb.discountRules.add(discountRule);

    if (result) {
      commit('cache/add', { key: 'discountRules', value: result }, { root: true });
      return true;
    }
    else {
      return false;
    }
  },

  async update({ commit, dispatch }: Database.IStore, discountRule: Database.IDiscountRule) {
    const findDiscountRule: Database.IDiscountRule = await dispatch('getById', discountRule.id);

    if (!findDiscountRule) {
      return false;
    }

    const newDiscountRule = { ...findDiscountRule, ...discountRule };
    commit('cache/update', { key: 'discountRules', value: newDiscountRule}, { root: true });
    await Vue.prototype.$fb.discountRules.update(newDiscountRule);
    return true;
  },

  async remove({ commit }: Database.IStore, id: string) {
    await Vue.prototype.$fb.discountRules.remove(id);
    commit('cache/remove', { key: 'discountRules', id }, { root: true });
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
