import { ActionContext } from "vuex";

namespace Database {
  export namespace Store {
    export interface IState {
      users: IUser[] | null,
      places: IPlace[] | null,
      rules: IRule[] | null,
      stocks: IStock[] | null,
      'promo-codes': IPromoCode[] | null,
      'discount-rules': IDiscountRule[] | null,

    }
  }

  export type IStore = ActionContext<Store.IState, Store.IState>;

  export enum IUserRole {
    "developer",
    "adminPlus",
    "admin",
    "employee",
    "user"
  }

  export interface IUser {
    id: string,
    pos: number,
    accumulateUpdated: number,
    accumulated: number,
    birthday: number,
    cardId: string,
    country: string,
    fixDiscount: number,
    name: string,
    operator: string,
    phone: string,
    region: string,
    registered: number,
    role: IUserRole
  }

  export interface IPlace {
    id: string,
    pos: number,
    name: string,
    address: string,
    country: string,
    city: string,
    phone: string,
    reviewLink: string,
    instagram: string
  }

  export interface IRule {
    id: string,
    pos: number,
    name: string
  }

  export interface IStock {
    id: string,
    pos: number,
    name: string,
    description: string,
    imageId: string,
    imageUrl: string,
    validity: number
  }

  export interface IPromoCode {
    id: string,
    pos: number,
    code: string,
    discount: number,
    validity: number
  }

  export interface IDiscountRule {
    id: string,
    pos: number,
    percent: number,
    placeId: string,
    summa: number
  }

  export interface ICategory {
    id: string,
    pos: number,
    placeId: string,
    name: string,
    price: string,
    isIconVisible: number,
    isAvailable: number,
    isHeader: number
  }
}

export { Database }
