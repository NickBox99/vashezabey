import { Database } from "~/types";
import Vue from "vue";
import {getPosElementDB} from "~/helpers";

export default {
  async getAll({ dispatch }: Database.IStore): Promise<Database.ICategory[]> {
    return dispatch('cache/getUseCache', { key: 'categories-tea-not-teas', fetchCallback: () => Vue.prototype.$fb.categories.tea.notTeas.getAll() }, { root: true })
  },

  async getById({ dispatch }: Database.IStore, id: string): Promise<Database.ICategory | undefined> {
    const result: Database.ICategory[] = await dispatch('getAll');
    return result.find(cat => cat.id === id);
  },

  async add({ commit }: Database.IStore, category: Database.ICategory) {
    commit('cache/add', { key: 'categories-tea-not-teas', value: await Vue.prototype.$fb.categories.tea.notTeas.add(category) }, { root: true });
  },

  async update({ commit, dispatch }: Database.IStore, category: Database.ICategory) {
    const findCat = await dispatch('getById', category.id);

    if (!findCat) {
      return false;
    }

    const newCategory = { ...findCat, ...category };
    commit('cache/update', { key: 'categories-tea-not-teas', value: newCategory}, { root: true });
    Vue.prototype.$fb.categories.tea.notTeas.update(newCategory);
    return true;
  },

  async remove({ commit }: Database.IStore, id: string) {
    await Vue.prototype.$fb.categories.tea.notTeas.remove(id);
    commit('cache/remove', { key: 'categories-tea-not-teas', id }, { root: true });
  },

  async move({ dispatch }, { el, newPos }) {
    const pos = getPosElementDB(await dispatch('getAll'), newPos, el);

    if (!pos) {
      return false;
    }

    return dispatch('update', { id: el.id, pos })
  }
}
