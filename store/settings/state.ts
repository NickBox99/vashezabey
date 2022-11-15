import { Settings } from "~/types";

export default () : Settings.Store.IState => ({
  settings: {
    id: '',
    phone: '',
    reviewLink: '',
    instagram: '',
    pos: 1,
    name: '',
    address: '',
    country: '',
    city: '',
  }
})
