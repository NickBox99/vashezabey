import { ActionContext } from "vuex";

export namespace Settings {
  export namespace Store {

    export interface IState {
      settings: ISettings | null,
      common: ICommon | null
    }
  }

  export type IStore = ActionContext<Store.IState, Store.IState>;

  export interface ISettings {
    id: string,
    name: string,
    instagram: string,
    reviewLink: string,
    phone: string
  }

  export interface IInterest {
    id: number,
    percent: number,
    summa: number
  }

  export interface ICommon {
    balance: number
  }
}
