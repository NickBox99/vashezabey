import Vue from "vue";
import { Database } from "~/types";
import { getPosElementDB } from "~/helpers";

export default {
  async getAll({ dispatch }: Database.IStore): Promise<Database.ICategory[]> {
    return dispatch('cache/getUseCache', { key: 'beveragesMilkshakes', fetchCallback: () => Vue.prototype.$fb.categories.beverages.milkshakes.getAll() }, { root: true })
  },

  async getById({ dispatch }: Database.IStore, id: string): Promise<Database.ICategory | undefined> {
    const result: Database.ICategory[] = await dispatch('getAll');
    return result.find(cat => cat.id === id);
  },

  async add({ commit }: Database.IStore, category: Database.ICategory) {
    const result: Database.ICategory | null = await Vue.prototype.$fb.categories.beverages.milkshakes.add(category);

    if (result) {
      commit('cache/add', { key: 'beveragesMilkshakes', value: result }, { root: true });
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
    commit('cache/update', { key: 'beveragesMilkshakes', value: newCategory}, { root: true });
    await Vue.prototype.$fb.categories.beverages.milkshakes.update(newCategory);
    return true;
  },

  async remove({ commit }: Database.IStore, id: string) {
    await Vue.prototype.$fb.categories.beverages.milkshakes.remove(id);
    commit('cache/remove', { key: 'beveragesMilkshakes', id }, { root: true });
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
