import { Database } from "@/types";

export default {
  async getPricesHookahs({ dispatch }: Database.IStore): Promise<string[]> {
    return dispatch('getUseCache', { key: 'pricesHookahs', fetchCallback: () => [] });
  },

  async getUseCache<T>({ getters, commit }: Database.IStore, { key, fetchCallback }: { key: keyof Database.Store.IState, fetchCallback: () => T }): Promise<T> {
    return  fetchCallback();
  }
}
