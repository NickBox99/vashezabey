import { Database } from "~/types";
import Vue from "vue";
import {getPosElementDB} from "~/helpers";

export default {
  async getAll({ dispatch }: Database.IStore): Promise<Database.ICategory[]> {
    return dispatch('cache/getUseCache', { key: 'categories-snacks-sandwiches', fetchCallback: () => Vue.prototype.$fb.categories.snacks.sandwiches.getAll() }, { root: true })
  },

  async getById({ dispatch }: Database.IStore, id: string): Promise<Database.ICategory | undefined> {
    const result: Database.ICategory[] = await dispatch('getAll');
    return result.find(cat => cat.id === id);
  },

  async add({ commit }: Database.IStore, category: Database.ICategory) {
    commit('cache/add', { key: 'categories-snacks-sandwiches', value: await Vue.prototype.$fb.categories.snacks.sandwiches.add(category) }, { root: true });
  },

  async update({ commit, dispatch }: Database.IStore, category: Database.ICategory) {
    const findCat = await dispatch('getById', category.id);

    if (!findCat) {
      return false;
    }

    const newCategory = { ...findCat, ...category };
    commit('cache/update', { key: 'categories-snacks-sandwiches', value: newCategory}, { root: true });
    Vue.prototype.$fb.categories.snacks.sandwiches.update(newCategory);
    return true;
  },

  async remove({ commit }: Database.IStore, id: string) {
    await Vue.prototype.$fb.categories.snacks.sandwiches.remove(id);
    commit('cache/remove', { key: 'categories-snacks-sandwiches', id }, { root: true });
  },

  async move({ dispatch }, { el, newPos }) {
    const pos = getPosElementDB(await dispatch('getAll'), newPos, el);

    if (!pos) {
      return false;
    }

    return dispatch('update', { id: el.id, pos })
  }
}