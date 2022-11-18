<template>
  <div class="header">
    <div class="header__wrapper">
      <nuxt-link to="/" class="header__back">Назад</nuxt-link>
      <h1 class="header__title">{{ this.settings.title }}</h1>
      <img v-if="this.settings.icon" :src="require(`../assets/img/icons/categories/${this.settings.icon}.svg`)" class="header__icon" width="22" height="22" :alt="this.settings.title">
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { headerConfig } from "@/config"

export default Vue.extend({
  name: "the-header",
  head(){
    return {
      title: this.settings.title
    }
  },
  computed: {
    settings() {
      const config = headerConfig[this.$route.name];

      return {
        title: config?.title || "ВащеЗабей",
        icon: config?.icon
      }
    }
  }
})
</script>

<style scoped lang="scss">
.header {
  position: sticky;
  top: 0;
  z-index: var(--z-index-header);
  background: var(--background-page);

  &__wrapper {
    display: flex;
    align-items: center;
  }

  &__back, &__title {
    width: calc(100% / 3);
  }

  &__back {
    display: flex;
    align-items: center;
    padding: 17px 15px 17px 0;

    &:before {
      content: '';
      margin-right: 10.44px;
      width: 8px;
      height: 12px;
      background: url('~/assets/img/icons/arrow.svg') no-repeat center center;
    }
  }

  &__title {
    font-size: 14px;
    text-align: center;
  }

  &__icon {
    margin-left: auto;
    text-align: right;
  }
}
</style>
