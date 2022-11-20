import { Settings } from "~/types";

export default {
  set(state: Settings.Store.IState, settings: Settings.ISettings) {
    state.settings = settings;
  },

  setCommon(state: Settings.Store.IState, common: Settings.ICommon) {
    state.common = common;
  }
}
