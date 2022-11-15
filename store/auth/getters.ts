import { Auth } from "~/types";

export default {
  getUser(state: Auth.Store.IState) {
    return state.user;
  },

  isAuth(state: Auth.Store.IState) {
    return !!state.user;
  }
}
