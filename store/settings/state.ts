import { Settings } from "~/types";

export default () : Settings.Store.IState => ({
  settings: {
    id: '',
    name: '',
    instagram: '',
    reviewLink: '',
    phone: ''
  },

  common: {
    balance: 0
  }
})
