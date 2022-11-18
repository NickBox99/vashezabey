<template>
  <div class="accumulate-interest">
    <h2 class="accumulate-interest__title">Как накопить процент?</h2>
    <div class="accumulate-interest__description">Скидка по карте постоянного покупателя растёт в зависимости от общей суммы ваших покупок</div>

    <div class="accumulate-interest__discounts">
      <div class="accumulate-interest__discount"
           v-for="interest in accumulateInterests"
           :key="interest.id"
      >
        <span>от {{ numberConvert(interest.summa) }} руб</span>
        <span>{{ interest.percent }}%</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { numberConvert } from "@/helpers"
import { Settings } from "@/types"

export default Vue.extend({
  name: "accumulate-interest",
  props: {
    accumulateInterests: {
      type: Array as PropType<Settings.IInterest[]>,
      default: () => ([])
    }
  },
  methods: {
    numberConvert
  }
})
</script>

<style scoped lang="scss">
.accumulate-interest {
  &__title {
    margin-bottom: 12px;
    font-size: 14px;
  }

  &__description, &__discount {
    color: var(--color-white-opac60);
  }

  &__description {
    margin-bottom: 19px;
    width: 301px;
  }

  &__discount {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    background: var(--color-grey-1);
    border-radius: var(--border-radius-large);

    &s {
      display: grid;
      grid-gap: var(--size-gap);
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media screen and (max-width: 640px) {
    &__discounts {
      grid-template-columns: 1fr;
    }
  }
}
</style>
