<template>
  <base-wrapper stretch>
    <stocks-list-item
      v-for="stock in stocks"
      :key="stock.id"
      v-bind="stock"
    />
  </base-wrapper>
</template>

<script lang="ts">
import { Database } from '@/types';
import Vue from "vue";

export default Vue.extend({
  name: "stock-list",
  props: {
    maxSize: {
      type: Number,
      default: null
    }
  },
  async fetch() {
    this.stocks = await this.$store.dispatch('database/stocks/getAll');

    if (this.maxSize) {
      this.stocks.length = this.maxSize;
    }
  },
  data() {
    return {
      stocks: [] as Database.IStock[]
    }
  }
})
</script>
