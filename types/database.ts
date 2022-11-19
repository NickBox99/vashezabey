import { ActionContext } from "vuex";
import Vue from "vue";

namespace Database {
  export namespace Store {
    export interface IState {
      users: IUser[] | null,
      stocks: IStock[] | null,
      rules: IRule[] | null,
      places: IPlace[] | null,
      promoCodes: IPromoCode[] | null,
      discountRules: IDiscountRule[] | null,

      //categories
      beveragesBeer: ICategory[] | null,
      beveragesColdTeas: ICategory[] | null,
      beveragesEnergeticDrinks: ICategory[] | null,
      beveragesJuices: ICategory[] | null,
      beveragesLemonade: ICategory[] | null,
      beveragesMilkshakes: ICategory[] | null,
      coffee: ICategory[] | null,
      dessertsIceCream: ICategory[] | null,
      dessertsSherbets: ICategory[] | null,
      hookahAdditional: ICategory[] | null,
      hookahCorkageFees: ICategory[] | null,
      hookahFruity: ICategory[] | null,
      snacks: ICategory[] | null,
      snacksSandwiches: ICategory[] | null,
      teaAdditives: ICategory[] | null,
      teaNotTeas: ICategory[] | null,
      teaChinese: ICategory[] | null,
      teaClassic: ICategory[] | null
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
    name: string,//await Vue.prototype.///123213
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
