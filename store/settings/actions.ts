import {Database, Settings} from "~/types";
import Vue from "vue";

export default {
  async initSettings({ commit, dispatch }: Settings.IStore, placeId?: string) {
    const findPlace: Database.IPlace | null = await dispatch('database/places/getById', placeId, { root: true });
    const place: Database.IPlace = findPlace?? (await dispatch('database/places/getAll', null, { root: true }))[0];
    commit('set', place);

    commit('setCommon', await Vue.prototype.$fb.common.get());
  },

  async update({ commit, dispatch }: Settings.IStore, settings: Settings.ISettings) {
    return await  dispatch('database/places/update', settings, { root: true });
  }
}
