import Vue from "vue";
import { Database } from "~/types";
import { getPosElementDB } from "~/helpers";

export default {
  async getAll({ dispatch }: Database.IStore): Promise<Database.IHookahGeneral[]> {
    return dispatch('cache/getUseCache', { key: 'hookahGeneral', fetchCallback: () => Vue.prototype.$fb.categories.hookah.general.getAll() }, { root: true })
  },

  async get({ dispatch, rootGetters }: Database.IStore): Promise<Database.IHookahGeneral> {
    const elements: Database.IHookahGeneral[] = await dispatch('getAll');
    const placeId = rootGetters["settings/getId"];

    const hookahGeneral = elements.find(el => el.placeId === placeId)

    return hookahGeneral?? {
      id: '',
      pos: Date.now(),
      placeId,
      firstPriceHookah: 0,
      secondPriceHookah: 0
    };
  },

  async update({ commit, dispatch }: Database.IStore, hookahGeneral: Database.IHookahGeneral) {
    const findHookahGeneral: Database.ICategory = await dispatch('get');

    if (!findHookahGeneral) {
      return false;
    }

    const newHookahGeneral = { ...findHookahGeneral, ...hookahGeneral };
    commit('cache/update', { key: 'hookahGeneral', value: newHookahGeneral }, { root: true });
    await Vue.prototype.$fb.categories.hookah.general.update(newHookahGeneral);
    return true;
  }
}
