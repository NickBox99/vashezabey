import { Database } from "~/types";

export default {
  async getUseCache<T>({ getters, commit }: Database.IStore, { type, key, fetchCallback }: { type?: 'array', key: keyof Database.Store.IState, fetchCallback: () => T }): Promise<T> {
    const cache = type === 'array'? getters.getArray(key) : getters.get(key);
    if (cache)
      return cache;

    const response = await fetchCallback();
    commit('set', { key, value: response });
    return response;
  }
}
