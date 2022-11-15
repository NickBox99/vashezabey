<template>
  <div class="rules">
    <div class="rules__rule"
         v-for="(rule, idx) in rules"
         :key="rule.id"
         :data-number="getNumberRule(idx + 1)"
    >{{ rule.name }}</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Database } from "@/types";

export default Vue.extend({
  name: "rules",
  async asyncData(ctx) {
    const rules: Database.IRule[] = await ctx.store.dispatch('database/rules/getAll');
    return { rules }
  },
  data(){
    return {
      rules: [] as Database.IRule[]
    }
  },
  methods: {
    getNumberRule(num: number) {
      return num > 9? num : `0${num}`;
    }
  }
})
</script>

<style scoped lang="scss">
.rules {
  &__rule {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    padding: 16px;
    color: var(--color-white-opac70);
    background: var(--color-grey-1);
    border-radius: var(--border-radius-large);

    &:before {
      content: attr(data-number);
      align-self: flex-start;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 16px;
      flex: 0 0 36px;
      height: 36px;
      font-weight: 600;
      font-size: 14px;
      color: var(--color-white);
      background: var(--background-rule-number);
      border-radius: var(--border-radius-medium);
    }
  }
}
</style>
