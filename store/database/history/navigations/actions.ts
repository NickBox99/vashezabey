import Vue from "vue";
import { Database, Smsc } from "~/types";
import { getPosElementDB } from "~/helpers";

export default {
  async getAll({ dispatch }: Database.IStore): Promise<Database.IUser[]> {
    return dispatch('cache/getUseCache', { key: 'users', fetchCallback: () => Vue.prototype.$fb.users.getAll() }, { root: true })
  },

  async hasUser({ dispatch }: Database.IStore, phone: string) {
    return !!(await dispatch('getByPhone', phone));
  },

  async getByPhone({ dispatch }: Database.IStore, phone: string): Promise<Database.IUser | undefined> {
    const users: Database.IUser[] = await dispatch('getAll');
    return users.find(user => user.phone === phone);
  },

  async getById({ dispatch }: Database.IStore, id: string): Promise<Database.IUser | undefined> {
    const users: Database.IUser[] = await dispatch('getAll');
    return users.find(user => user.id === id);
  },

  async addAccumulated({ commit, dispatch }: Database.IStore, { id, accumulated }: Database.IUser) {
    const findUser: Database.IUser | null = await dispatch('getById', id);

    if (!findUser) {
      return false;
    }

    return dispatch('update', { id, accumulated: findUser.accumulated + accumulated, accumulateUpdated: Date.now()})
  },

  async add({ commit }: Database.IStore, user: Database.IUser) {

    const newUser: Database.IUser = Object.assign({
      accumulated: 0,
      accumulateUpdated: Date.now(),
      registered: Date.now(),
      cardId: '',
      fixDiscount: '',
      operator: '',
      region: '',
      country: '',
      role: Database.IUserRole.user
    }, user);

    const smsc: Smsc.IPhoneInfo | null = await Vue.prototype.$smsc.getInfoPhone(user.phone);

    if (smsc) {
      const { country, operator, region } = smsc;
      newUser.operator = operator;
      newUser.region = region;
      newUser.country = country;
    }

    const result = await Vue.prototype.$fb.users.add(newUser);

    if (result) {
      commit('cache/add', { key: 'users', value: result }, { root: true });
      return true;
    }
    else {
      return false;
    }
  },

  async update({ commit, dispatch }: Database.IStore, user: Database.IUser) {
    const findUser: Database.IUser | null = await dispatch('getById', user.id);

    if (!findUser) {
      return false;
    }

    const newUser = { ...findUser, ...user };

    commit('cache/update', { key: 'users', value: newUser}, { root: true });
    await Vue.prototype.$fb.users.update(newUser);
    return true;
  },

  async remove({ commit }: Database.IStore, id: string) {
    await Vue.prototype.$fb.users.remove(id);
    commit('cache/remove', { key: 'users', id }, { root: true });
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
