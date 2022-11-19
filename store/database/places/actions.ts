import { Database } from "~/types";
import Vue from "vue";
import {getPosElementDB} from "~/helpers";

export default {
  async getAll({ dispatch }: Database.IStore): Promise<Database.IPlace[]> {
    return dispatch('cache/getUseCache', { key: 'places', fetchCallback: () => Vue.prototype.$fb.places.getAll() }, { root: true })
  },

  async getById({ dispatch }: Database.IStore, id: string): Promise<Database.IPlace | undefined> {
    const places: Database.IPlace[] = await dispatch('getAll');
    return places.find(place => place.id === id);
  },

  async add({ commit }: Database.IStore, place: Database.IPlace) {
    const result: Database.IPlace = await Vue.prototype.$fb.places.add({
      ...place,
      phone: '',
      reviewLink: '',
      instagram: ''
    });

    if (result) {
      commit('cache/add', { key: 'places', value: result }, { root: true });
      return true;
    }
    else {
      return false;
    }
  },

  async update({ commit, dispatch }: Database.IStore, place: Database.IPlace) {
    const findPlace: Database.IPlace = await dispatch('getById', place.id);

    if (!findPlace) {
      return false;
    }

    const newPlace = { ...findPlace, ...place };
    commit('cache/update', { key: 'places', value: newPlace}, { root: true });
    await Vue.prototype.$fb.places.update(newPlace);
    return true;
  },

  async remove({ commit }: Database.IStore, id: string) {
    await Vue.prototype.$fb.places.remove(id);
    commit('cache/remove', { key: 'places', id }, { root: true });
    return true;
  },

  async move({ dispatch }, { el, newPos }) {
    const pos = getPosElementDB(await dispatch('getAll'), newPos, el);

    if (!pos) {
      return false;
    }

    return dispatch('update', { id: el.id, pos });
  }
}
