<template>
  <statistics-bar
    title="Авторизации пользователей"
    :elements="elements"
  />
</template>

<script lang="ts">
import Vue from "vue";
import { Database, Statistics } from "~/types";
import { HistoryUserType } from "~/config"

export default Vue.extend({
  name: "cms-statistics-users",
  layout: 'cms',
  async asyncData({ store }){
    const historyUsers: Database.History.IUser[] = await store.dispatch('database/statistics/users/getAll');

    return {
      elements: historyUsers.map(({ dateTime, type }) => ({ label: HistoryUserType.get(type), value: 1, dateTime })) as Statistics.IElement[]
    }
  },
  data() {
    return {
      elements: [] as Statistics.IElement[]
    }
  }
})
</script>
