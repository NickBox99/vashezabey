<template>
  <div class="cms-main">
    <div class="cms-main__item">
      <div class="cms-main__title">Баланс</div>
      <div class="cms-main__value">{{ balance }} руб</div>
    </div>

    <div class="cms-main__item">
      <div class="cms-main__title">Кол-во пользователей</div>
      <div class="cms-main__value">{{ users.length }}</div>
    </div>

    <div class="cms-main__item">
      <div class="cms-main__title">Последние 5 посещений страниц</div>
      <div class="cms-main__value cms-main__history"
          v-for="history in historyNavigations"
          :key="history.id"
      >
        <span>{{ HistoryNavigationType.get(history.type) }}</span>
        <span class="cms-main__user">{{ getUserName(history.userId) }}</span>
        <span class="cms-main__date">{{ dateConvert(history.dateTime) }}</span>
      </div>
    </div>

    <div class="cms-main__item">
      <div class="cms-main__title">Последние 5 оплаченных счетов</div>
      <div class="cms-main__value cms-main__history"
           v-for="history in historyPayment"
           :key="history.id"
      >
        <span>{{ history.summa }} руб</span>
        <span class="cms-main__user">{{ getUserName(history.clientId) }}</span>
        <span class="cms-main__date">{{ dateConvert(history.dateTime) }}</span>
      </div>
    </div>

    <div class="cms-main__item">
      <div class="cms-main__title">Последние 5 входов</div>
      <div class="cms-main__value cms-main__history"
           v-for="history in historyUsers"
           :key="history.id"
      >
        <span>{{ HistoryUserType.get(history.type) }}</span>
        <span class="cms-main__user">{{ getUserName(history.userId) }}</span>
        <span class="cms-main__date">{{ dateConvert(history.dateTime) }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import { Database } from "~/types";
import { dateConvert } from "~/helpers"
import { HistoryNavigationType, HistoryUserType } from "~/config"

export default Vue.extend({
  name: "cms",
  layout: 'cms',
  async asyncData({ store }) {
    function decreaseSize(arr: (Database.History.INavigation | Database.History.IUser | Database.History.IPayment)[]) {
      const newArr = JSON.parse(JSON.stringify(arr));
      if (newArr.length > 5) {
        newArr.length = 5;
      }

      return newArr;
    }

    const historyNavigations: Database.History.INavigation[] = decreaseSize(await store.dispatch('database/statistics/navigation/getAll'));
    const historyUsers: Database.History.IUser[] = decreaseSize(await store.dispatch('database/statistics/users/getAll'));
    const historyPayment: Database.History.IPayment[] = decreaseSize(await store.dispatch('database/statistics/payment/getAll'));

    return { historyNavigations, historyUsers, historyPayment }
  },
  data() {
    return {
      historyNavigations: [] as Database.History.INavigation[],
      historyUsers: [] as Database.History.IUser[],
      historyPayment: [] as Database.History.IPayment[],
      HistoryNavigationType,
      HistoryUserType
    }
  },
  methods: {
    dateConvert,
    getUserName(id: string) {
      const user = this.users.find(user => user.id === id);
      return user? `[${user.cardId}] ${user.name}` : "Не авторизован";
    }
  },
  computed: {
    ...mapGetters({
      users: 'database/users/getAll',
      balance: 'settings/getBalance'
    })
  }
})
</script>

<style lang="scss">
.cms-main {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(2, 1fr);

  &__item {
    padding: 10px;
    border: var(--border-cms-default);
    border-radius: var(--border-radius-medium);
  }

  &__title {
    margin-bottom: 5px;
    font-weight: 600;
    font-size: 20px;
    color: var(--color-orange);
  }

  &__value {
    font-size: 16px;
  }

  &__history {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-content: space-between;
  }

  &__user {
    text-align: center;
  }

  &__date {
    text-align: right;
  }
}
</style>
