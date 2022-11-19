import { Database } from "@/types";

export default (): Database.Store.IState => ({
  users: null,
  places: null,
  rules: null,
  stocks: null,
  promoCodes: null,
  discountRules: null,
  beveragesBeer: null,
  beveragesColdTeas: null,
  beveragesEnergeticDrinks: null,
  beveragesJuices: null,
  beveragesLemonade: null,
  beveragesMilkshakes: null,
  coffee: null,
  dessertsIceCream: null,
  dessertsSherbets: null,
  hookahAdditional: null,
  hookahCorkageFees: null,
  hookahFruity: null,
  snacks: null,
  snacksSandwiches: null,
  teaAdditives: null,
  teaNotTeas: null,
  teaChinese: null,
  teaClassic: null
})
