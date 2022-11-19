import { Database } from "@/types";

export default (): Database.Store.IState => ({
  users: null,
  places: null,
  rules: null,
  stocks: null,
  promoCodes: null,
  discountRules: null,
})
