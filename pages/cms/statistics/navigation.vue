<template>
  <statistics-bar
    title="Посещаемость сайта"
    :elements="elements"
  />
</template>

<script lang="ts">
import Vue from "vue";
import { Database, Statistics } from "~/types";
import { HistoryNavigationType } from "~/config"

export default Vue.extend({
  name: "cms-statistics-navigation",
  layout: 'cms',
  async asyncData({ store }){
    const historyNavigations: Database.History.INavigation[] = await store.dispatch('database/statistics/navigation/getAll');

    return {
      elements: historyNavigations.map(({ dateTime, type }) => ({ label: HistoryNavigationType.get(type), value: 1, dateTime })) as Statistics.IElement[]
    }
  },
  data() {
    return {
      elements: [] as Statistics.IElement[]
    }
  }
})
</script>
