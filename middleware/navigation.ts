import { Context } from "@nuxt/types";
import { Database } from "~/types";
import IUserRole = Database.IUserRole;

export default async function ({ store, route }: Context) {
  const routeName = route.name as string;
  const isCmsLocation = routeName.includes('cms');

  if (!isCmsLocation && store.getters["auth/getUserRole"] === IUserRole.user) {
    await store.dispatch('database/history/navigations/add', routeName);
  }
}
