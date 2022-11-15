import { Database } from "~/types";

export default {
  get(state: Database.Store.IState) {
    return (key: keyof Database.Store.IState) => state[key];
  }
}
