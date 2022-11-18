import { Context } from "@nuxt/types";
import { Database } from "~/types";

export default async function ({ store, redirect, route, query }: Context) {
  await store.dispatch('settings/initSettings', query.place);

  const isAuth: boolean = await store.dispatch('auth/initAuth');
  const routeName = route.name as string;

  const isCmsLocation = routeName.includes('cms');

  if (isAuth) {
    if (routeName === 'login') {
      redirect('/discount');
    }

    const user: Database.IUser = store.getters["auth/getUser"];
    if(isCmsLocation && user.role > Database.IUserRole.employee) {
      redirect('/discount');
    }
  }

  if (!isAuth) {
    if (['discount', 'profile'].includes(routeName) || isCmsLocation) {
      redirect('/login');
    }
  }
}
