<template>
  <statistics-bar
    title="Статистика по оплатам"
    :elements="elements"
  />
</template>

<script lang="ts">
import Vue from "vue";
import { Database, Statistics } from "~/types";
import { HistoryNavigationType } from "~/config"

export default Vue.extend({
  name: "cms-statistics-payment",
  layout: 'cms',
  async asyncData({ store }){
    const historyPayments: Database.History.IPayment[] = await store.dispatch('database/statistics/payment/getAll');
    const users: Database.IUser[] = await store.dispatch('database/users/getAll');

    function getUserLabel(id: string) {
      const user = users.find(user => user.id === id);

      if (user) {
        const { cardId, name } = user;
        return `[${cardId}] ${name}`;
      }
      else {
        return "Не распознан"
      }
    }

    return {
      elements: historyPayments.map(({ dateTime, summa, clientId }) => ({ label: getUserLabel(clientId), value: summa, dateTime })) as Statistics.IElement[]
    }
  },
  data() {
    return {
      elements: [] as Statistics.IElement[]
    }
  }
})
</script>
