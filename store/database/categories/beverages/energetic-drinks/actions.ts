import Vue from "vue";
import { Database } from "~/types";
import { getPosElementDB } from "~/helpers";

export default {
  async getAll({ dispatch }: Database.IStore): Promise<Database.ICategory[]> {
    return dispatch('cache/getUseCache', { key: 'beveragesEnergeticDrinks', fetchCallback: () => Vue.prototype.$fb.categories.beverages.energeticDrinks.getAll() }, { root: true })
  },

  async getById({ dispatch }: Database.IStore, id: string): Promise<Database.ICategory | undefined> {
    const result: Database.ICategory[] = await dispatch('getAll');
    return result.find(cat => cat.id === id);
  },

  async add({ commit }: Database.IStore, category: Database.ICategory) {
    const result: Database.ICategory | null = await Vue.prototype.$fb.categories.beverages.energeticDrinks.add(category);

    if (result) {
      commit('cache/add', { key: 'beveragesEnergeticDrinks', value: result }, { root: true });
      return true;
    }
    else {
      return false;
    }
  },

  async update({ commit, dispatch }: Database.IStore, category: Database.ICategory) {
    const findCat: Database.ICategory = await dispatch('getById', category.id);

    if (!findCat) {
      return false;
    }

    const newCategory = { ...findCat, ...category };
    commit('cache/update', { key: 'beveragesEnergeticDrinks', value: newCategory}, { root: true });
    await Vue.prototype.$fb.categories.beverages.energeticDrinks.update(newCategory);
    return true;
  },

  async remove({ commit }: Database.IStore, id: string) {
    await Vue.prototype.$fb.categories.beverages.energeticDrinks.remove(id);
    commit('cache/remove', { key: 'beveragesEnergeticDrinks', id }, { root: true });
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
