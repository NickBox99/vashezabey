import { Database } from "~/types";
import { sortByPos } from "~/helpers";

export default {
  set<K extends keyof Database.Store.IState, V extends Database.Store.IState[K]>(state: Database.Store.IState, { key, value }: { key: K, value: V }) {
    state[key] = value;
  },

  add<T extends Database.Store.IState, K extends keyof T, V extends T[K][][number]>(state: { [K in keyof T]: V[] }, { key, value }: { key: K, value: V }) {
    if(state[key]) {
      state[key].push(value);
    }
    else {
      state[key] = [value];
    }
  },

  update<T extends Database.Store.IState, K extends keyof T, V extends T[K][][number]>(state: { [K in keyof T]: V[] }, { key, value }: { key: K, value: V }) {
    //@ts-ignore
    state[key] = sortByPos(state[key].map(el => el.id === value.id? {...el, ...value} : el));
  },

  //@ts-ignore
  remove(state, { key, id }) {
    //@ts-ignore
    state[key] = state[key].filter(el => el.id !== id);
  }
}
