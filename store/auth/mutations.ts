import { Auth, Database } from "~/types";

export default {
  setUser(state: Auth.Store.IState, user: Database.IUser) {
    state.user = user;
  }
}
