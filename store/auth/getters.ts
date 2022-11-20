import {Auth, Database} from "~/types";
import IUserRole = Database.IUserRole;

export default {
  getUser(state: Auth.Store.IState) {
    return state.user;
  },

  getUserId(state: Auth.Store.IState) {
    return state.user?.id;
  },

  getUserRole(state: Auth.Store.IState) {
    return state.user? state.user.role : IUserRole.user;
  },

  isAuth(state: Auth.Store.IState) {
    return !!state.user;
  }
}
