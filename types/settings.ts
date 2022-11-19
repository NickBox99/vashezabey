import { ActionContext } from "vuex";
import { Database } from "~/types/database";

namespace Settings {
  export namespace Store {

    export interface IState {
      settings: ISettings | null
    }
  }

  export type IStore = ActionContext<Store.IState, Store.IState>;

  export interface ISettings extends Database.IPlace {}

  export interface IInterest {
    id: number,
    percent: number,
    summa: number
  }
}

export { Settings }
