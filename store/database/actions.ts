import Vue from "vue";
import { Database } from "@/types";
import {getPosElementDB} from "~/helpers";

export default {
  async getRules({ dispatch }: Database.IStore): Promise<Database.IRule[]> {
    return dispatch('getUseCache', { key: 'rules', fetchCallback: () => Vue.prototype.$fb.rules.getAll() });
  },

  async getPricesHookahs({ dispatch }: Database.IStore): Promise<string[]> {
    return dispatch('getUseCache', { key: 'pricesHookahs', fetchCallback: () => Vue.prototype.$fb.pricesHookahs.getAll() });
  },

  async getClassicTeas({ dispatch }: Database.IStore): Promise<Database.ICategory[]> {
    return dispatch('getUseCache', { key: 'classicTeas', fetchCallback: () => Vue.prototype.$fb.classicTeas.getAll() });
  },

  async getNotTeas({ dispatch }: Database.IStore): Promise<Database.ICategory[]> {
    return dispatch('getUseCache', { key: 'notTeas', fetchCallback: () => Vue.prototype.$fb.notTeas.getAll() });
  },

  async getChineseTeas({ dispatch }: Database.IStore): Promise<Database.ICategory[]> {
    return dispatch('getUseCache', { key: 'chineseTeas', fetchCallback: () => Vue.prototype.$fb.chineseTeas.getAll() });
  },

  async getAdditives({ dispatch }: Database.IStore): Promise<Database.ICategory[]> {
    return dispatch('getUseCache', { key: 'additives', fetchCallback: () => Vue.prototype.$fb.additives.getAll() });
  },

  async getFruitHookahs({ dispatch }: Database.IStore): Promise<Database.ICategory[]> {
    return dispatch('getUseCache', { key: 'fruitHookahs', fetchCallback: () => Vue.prototype.$fb.fruitHookahs.getAll() });
  },

  async getSandwiches({ dispatch }: Database.IStore): Promise<Database.ICategory[]> {
    return dispatch('getUseCache', { key: 'sandwiches', fetchCallback: () => Vue.prototype.$fb.sandwiches.getAll() });
  },

  async getSnacks({ dispatch }: Database.IStore): Promise<Database.ICategory[]> {
    return dispatch('getUseCache', { key: 'snacks', fetchCallback: () => Vue.prototype.$fb.snacks.getAll() });
  },

  async getCorkageFees({ dispatch }: Database.IStore): Promise<Database.ICategory[]> {
    return dispatch('getUseCache', { key: 'corkageFees', fetchCallback: () => Vue.prototype.$fb.corkageFees.getAll() });
  },

  async getAdditionallyHookahs({ dispatch }: Database.IStore): Promise<Database.ICategory[]> {
    return dispatch('getUseCache', { key: 'additionallyHookahs', fetchCallback: () => Vue.prototype.$fb.additionallyHookahs.getAll() });
  },

  async getLemonades({ dispatch }: Database.IStore): Promise<Database.ICategory[]> {
    return dispatch('getUseCache', { key: 'lemonades', fetchCallback: () => Vue.prototype.$fb.lemonades.getAll() });
  },

  async getMilkshakes({ dispatch }: Database.IStore): Promise<Database.ICategory[]> {
    return dispatch('getUseCache', { key: 'milkshakes', fetchCallback: () => Vue.prototype.$fb.milkshakes.getAll() });
  },

  async getColdTeas({ dispatch }: Database.IStore): Promise<Database.ICategory[]> {
    return dispatch('getUseCache', { key: 'coldTeas', fetchCallback: () => Vue.prototype.$fb.coldTeas.getAll() });
  },

  async getJuices({ dispatch }: Database.IStore): Promise<Database.ICategory[]> {
    return dispatch('getUseCache', { key: 'juices', fetchCallback: () => Vue.prototype.$fb.juices.getAll() });
  },

  async getEnergeticDrinks({ dispatch }: Database.IStore): Promise<Database.ICategory[]> {
    return dispatch('getUseCache', { key: 'energeticDrinks', fetchCallback: () => Vue.prototype.$fb.energeticDrinks.getAll() });
  },

  async getBeer({ dispatch }: Database.IStore): Promise<Database.ICategory[]> {
    return dispatch('getUseCache', { key: 'beer', fetchCallback: () => Vue.prototype.$fb.beer.getAll() });
  },

  async getCoffee({ dispatch }: Database.IStore): Promise<Database.ICategory[]> {
    return dispatch('getUseCache', { key: 'coffee', fetchCallback: () => Vue.prototype.$fb.coffee.getAll() });
  },

  async getSherbets({ dispatch }: Database.IStore): Promise<Database.ICategory[]> {
    return dispatch('getUseCache', { key: 'sherbet', fetchCallback: () => Vue.prototype.$fb.sherbets.getAll() });
  },

  async getIceCream({ dispatch }: Database.IStore): Promise<Database.ICategory[]> {
    return dispatch('getUseCache', { key: 'iceCream', fetchCallback: () => Vue.prototype.$fb.iceCream.getAll() });
  },

  async getStocks({ dispatch }: Database.IStore): Promise<Database.IStock[]> {
    return dispatch('getUseCache', { key: 'stocks', fetchCallback: () => Vue.prototype.$fb.stocks.getAll() });
  },

  async getUseCache<T>({ getters, commit }: Database.IStore, { key, fetchCallback }: { key: keyof Database.Store.IState, fetchCallback: () => T }): Promise<T> {
    const cache = getters.get(key);
    if (cache)
      return cache;

    const response = await fetchCallback();
    commit('set', { key, value: response });
    return response;
  }
}
