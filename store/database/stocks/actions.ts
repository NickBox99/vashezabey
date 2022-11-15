import { Database } from "~/types";
import Vue from "vue";
import {getPosElementDB} from "~/helpers";

export default {
  async getAll({ dispatch }: Database.IStore): Promise<Database.IStock[]> {
    return dispatch('cache/getUseCache', { key: 'stocks', fetchCallback: () => Vue.prototype.$fb.stocks.getAll() }, { root: true })
  },

  async getById({ dispatch }: Database.IStore, id: string): Promise<Database.IStock | undefined> {
    const stocks: Database.IStock[] = await dispatch('getAll');
    return stocks.find(stock => stock.id === id);
  },

  async add({ commit }: Database.IStore, stock: Database.IStock) {
    commit('cache/add', { key: 'stocks', value: await Vue.prototype.$fb.stocks.add(stock) }, { root: true });
  },

  async update({ commit, dispatch }: Database.IStore, stock: Database.IStock) {
    const findStock = await dispatch('getById', stock.id);

    if (!findStock) {
      return false;
    }

    const newStock = { ...findStock, ...stock };
    commit('cache/update', { key: 'stocks', value: newStock}, { root: true });
    Vue.prototype.$fb.stocks.update(newStock);
    return true;
  },

  async remove({ commit, dispatch }: Database.IStore, id: string) {
    const findStock = await dispatch('getById', id);

    if (!findStock) {
      return false;
    }

    await Vue.prototype.$fb.stocks.remove(id, findStock.imageId);
    commit('cache/remove', { key: 'stocks', id }, { root: true });
  },

  async move({ dispatch }, { el, newPos }) {
    const pos = getPosElementDB(await dispatch('getAll'), newPos, el);

    if (!pos) {
      return false;
    }

    return dispatch('update', { id: el.id, pos })
  }
}
