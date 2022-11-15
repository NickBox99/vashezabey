<template>
  <div class="stocks-list-element">
    <img class="stocks-list-element__img" width="300" height="168"
         :alt="name"
         :src="imageUrl"
    >
    <div class="stocks-list-element__content">
      <h2 class="stocks-list-element__title">{{ name }}</h2>
      <div class="stocks-list-element__description">{{ description }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "StocksListItem",
  props: {
    name: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    imageUrl: {
      type: String,
      default: ''
    }
  }
})
</script>

<style scoped lang="scss">
.stocks-list-element {
  border-radius: var(--border-radius-large);
  overflow: hidden;

  &__img {
    display: block;
    width: 100%;
    height: auto;
  }

  &__content {
    position: relative;
    padding: 16px;
    height: 100%;
    background: var(--color-grey-1);

    &:before {
      content: '';
      position: absolute;
      top:  -68px;
      left: 0;
      display: block;
      width: 100%;
      height: 68px;
      background: var(--color-gradient-purple-smoke);
    }
  }

  &__title {
    margin-bottom: 12px;
    font-size: 14px;
  }

  &__description {
    color: var(--color-white-opac60);
    line-height: 18.6px;
  }
}
</style>
