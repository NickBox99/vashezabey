import Vue from "vue";
import { Database } from "~/types";
import { getPosElementDB } from "~/helpers";

export default {
  async getAll({ dispatch }: Database.IStore): Promise<Database.IStock[]> {
    return dispatch('cache/getUseCache', { key: 'stocks', fetchCallback: () => Vue.prototype.$fb.stocks.getAll() }, { root: true })
  },

  async getById({ dispatch }: Database.IStore, id: string): Promise<Database.IStock | undefined> {
    const stocks: Database.IStock[] = await dispatch('getAll');
    return stocks.find(stock => stock.id === id);
  },

  async add({ commit }: Database.IStore, stock: Database.IStock) {
    const result: Database.IStock = await Vue.prototype.$fb.stocks.add(stock);

    if (result) {
      commit('cache/add', { key: 'stocks', value: result }, { root: true });
      return true;
    }
    else {
      return false;
    }
  },

  async update({ commit, dispatch }: Database.IStore, stock: Database.IStock) {
    const findStock: Database.IStock | null = await dispatch('getById', stock.id);

    if (!findStock) {
      return false;
    }

    const newStock = { ...findStock, ...stock };
    commit('cache/update', { key: 'stocks', value: newStock }, { root: true });
    await Vue.prototype.$fb.stocks.update(newStock);
    return true;
  },

  async remove({ commit, dispatch }: Database.IStore, id: string) {
    const findStock = await dispatch('getById', id);

    if (!findStock) {
      return false;
    }

    await Vue.prototype.$fb.stocks.remove(id, findStock.imageId);
    commit('cache/remove', { key: 'stocks', id }, { root: true });
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
