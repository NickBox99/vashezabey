<template>
  <h2 class="cms-title">
    {{ title }}
    <span class="cms-title__count" v-if="count">[{{ count }}]</span>
  </h2>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "cms-title",
  props: {
    title: {
      type: String,
      default: ""
    },
    count: {
      type: Number,
      default: 0
    }
  }
})
</script>

<style lang="scss" scoped>
.cms-title {
  margin-bottom: 15px;
  font-size: 20px;

  &__count {
    color: var(--color-white-opac50);
  }
}
</style>
