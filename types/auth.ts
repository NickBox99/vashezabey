import { ActionContext } from "vuex";
import { Database } from "~/types/database";

namespace Auth {
  export namespace Store {
    export interface IState {
      user: Database.IUser | null
    }
  }

  export type IStore = ActionContext<Store.IState, Store.IState>;
}

export { Auth }
