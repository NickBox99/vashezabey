import { Settings } from "~/types";

export default {
  get: (state: Settings.Store.IState) => state.settings,
  getId: (state: Settings.Store.IState) => state.settings?.id,
  getName: (state: Settings.Store.IState) => state.settings?.name
}
