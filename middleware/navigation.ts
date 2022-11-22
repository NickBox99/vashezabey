import { Context } from "@nuxt/types";
import { Database } from "~/types";
import IUserRole = Database.IUserRole;
import INavigationType = Database.History.INavigationType;

export default async function ({ store, route }: Context) {
  const routeName = route.name as string;
  const isCmsLocation = routeName.includes('cms');

  if (![INavigationType[INavigationType.index], INavigationType[INavigationType.login]].includes(routeName)
    && !isCmsLocation && store.getters["auth/getUserRole"] === IUserRole.user)
  {
    await store.dispatch('database/history/navigations/add', routeName);
  }
}
