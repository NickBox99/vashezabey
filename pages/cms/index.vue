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
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {mapGetters} from "vuex";

export default Vue.extend({
  name: "cms",
  layout: 'cms',
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
}
</style>
