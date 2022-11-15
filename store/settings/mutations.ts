import { Settings } from "~/types";

export default {
  set(state: Settings.Store.IState, settings: Settings.ISettings) {
    state.settings = settings;
  }
}
