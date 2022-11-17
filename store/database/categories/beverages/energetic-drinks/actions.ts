import { Database } from "~/types";
import Vue from "vue";
import {getPosElementDB} from "~/helpers";

export default {
  async getAll({ dispatch }: Database.IStore): Promise<Database.ICategory[]> {
    return dispatch('cache/getUseCache', { key: 'categories-beverages-energetic-drinks', fetchCallback: () => Vue.prototype.$fb.categories.beverages.energeticDrinks.getAll() }, { root: true })
  },

  async getById({ dispatch }: Database.IStore, id: string): Promise<Database.ICategory | undefined> {
    const result: Database.ICategory[] = await dispatch('getAll');
    return result.find(cat => cat.id === id);
  },

  async add({ commit }: Database.IStore, category: Database.ICategory) {
    commit('cache/add', { key: 'categories-beverages-energetic-drinks', value: await Vue.prototype.$fb.categories.beverages.energeticDrinks.add(category) }, { root: true });
  },

  async update({ commit, dispatch }: Database.IStore, category: Database.ICategory) {
    const findCat = await dispatch('getById', category.id);

    if (!findCat) {
      return false;
    }

    const newCategory = { ...findCat, ...category };
    commit('cache/update', { key: 'categories-beverages-energetic-drinks', value: newCategory}, { root: true });
    Vue.prototype.$fb.categories.beverages.energeticDrinks.update(newCategory);
    return true;
  },

  async remove({ commit }: Database.IStore, id: string) {
    await Vue.prototype.$fb.categories.beverages.energeticDrinks.remove(id);
    commit('cache/remove', { key: 'categories-beverages-energetic-drinks', id }, { root: true });
  },

  async move({ dispatch }, { el, newPos }) {
    const pos = getPosElementDB(await dispatch('getAll'), newPos, el);

    if (!pos) {
      return false;
    }

    return dispatch('update', { id: el.id, pos })
  }
}
