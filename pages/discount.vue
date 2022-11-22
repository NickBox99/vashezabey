<template>
  <div class="discount">
    <div class="discount__content">
      <info-circle class="discount__info-circle">{{ nowDiscount }}%</info-circle>

      <template v-if="user.fixDiscount <= 0">
        <div class="discount__info" v-if="leftAccumulate">До скидки {{ nextDiscount }}% вам<br>необходимо накопить ещё<br>{{ leftAccumulate }} руб</div>
        <div class="discount__info" v-else>У вас максимальная скидка</div>
      </template>

      <div class="discount__info" v-else>У вас персональная скидка</div>

      <div>Обновлено: {{ dateConvert(user.accumulateUpdated) }}</div>
      <div>Ваш персональный код: {{ user.cardId }}</div>
    </div>

    <discount-bonus class="discount__discount-bonus"
      @update-discount="updateDiscount"
    />
    <accumulate-interest
      :accumulate-interests="discountRules"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import { calcPersonDiscount, dateConvert } from "@/helpers";
import { Database } from "~/types";

export default Vue.extend({
  name: "discount",
  async asyncData({ store }) {
    const discountRules: Database.IDiscountRule[] = await store.dispatch('database/discount-rules/getAll');

    return { discountRules, ...calcPersonDiscount(discountRules, store.getters["auth/getUser"]) }
  },
  data() {
    return {
      nowDiscount: 0,
      nextDiscount: 0,
      leftAccumulate: 0,
      discountRules: [] as Database.IDiscountRule[]
    }
  },
  methods: {
    dateConvert,
    updateDiscount(val: number) {
      this.nowDiscount = val;
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/getUser'
    })
  }
})
</script>

<style scoped lang="scss">
.discount {
  position: relative;
  padding: 25px 0;

  &__content {
    height: 100px;
  }

  &__info-circle {
    position: absolute;
    top: 8px;
    left: 50%;
    transform: translateX(-50%);
  }

  &__info {
    margin-bottom: 12px;
    color: var(--color-white-opac60);
  }

  &__discount-bonus {
    margin-bottom: 36px;
  }

  @media screen and (max-width: 640px) {
    &__info-circle {
      left: unset;
      right: 0;
      transform: unset;
    }
  }
}
</style>
