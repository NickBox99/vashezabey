import Vue from "vue";
import { Database } from "~/types";
import { getPosElementDB } from "@/helpers"

export default {
  async getAll({ dispatch }: Database.IStore): Promise<Database.IRule[]> {
    return dispatch('cache/getUseCache', { key: 'rules', fetchCallback: () => Vue.prototype.$fb.rules.getAll() }, { root: true })
  },

  async getById({ dispatch }: Database.IStore, id: string): Promise<Database.IRule | undefined> {
    const rules: Database.IRule[] = await dispatch('getAll');
    return rules.find(rule => rule.id === id);
  },

  async add({ commit }: Database.IStore, rule: Database.IRule) {
    const result: Database.IRule = await Vue.prototype.$fb.rules.add(rule);

    if (result) {
      commit('cache/add', { key: 'rules', value: result }, { root: true });
      return true;
    }
    else {
      return false;
    }
  },

  async update({ commit, dispatch }: Database.IStore, rule: Database.IRule) {
    const findRule: Database.IRule = await dispatch('getById', rule.id);

    if (!findRule) {
      return false;
    }

    const newRule = { ...findRule, ...rule };
    commit('cache/update', { key: 'rules', value: newRule }, { root: true });
    await Vue.prototype.$fb.rules.update(newRule);
    return true;
  },

  async remove({ commit }: Database.IStore, id: string) {
    await Vue.prototype.$fb.rules.remove(id);
    commit('cache/remove', { key: 'rules', id }, { root: true });
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
