<template>
  <div class="footer">
    <nuxt-link active-class="footer__item_active" class="footer__item"
               exact
               v-for="link in links"
               :key="link.title"
               :to="link.to"
    >
      <img width="24" height="24" class="footer__icon"
           :src="require(`~/assets/img/icons/${link.icon}.svg`)"
           :alt="link.title"
      >
      <div class="footer__title">{{ link.title }}</div>
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "the-footer",
  data() {
    return {
      links: [
        { to: '/', icon: 'menu', title: 'Меню' },
        { to: '/stocks', icon: 'stocks', title: 'Акции' },
        { to: '/discount', icon: 'card', title: 'Дис. карта' },
        { to: '/profile', icon: 'profile', title: 'Профиль' }
      ]
    }
  }
})
</script>

<style scoped lang="scss">
.footer {
  position: sticky;
  bottom: 0;
  display: flex;
  justify-content: center;
  margin-top: auto;
  padding-top: 10px;
  width: 100%;
  background: var(--background-page);

  &__title {
    font-size: 10px;
    color: var(--color-text-footer);
  }

  &__item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0 13px;
    width: 67px;
    height: 64px;
    cursor: pointer;

    &:not(:last-child) {
      margin-right: 10px;
    }

    &_active {
      .footer__title {
        color: var(--color-text-footer-active);
      }
    }

    &:not(&_active) {
      .footer__icon {
        filter: grayscale(1);
        opacity: .2;
      }
    }
  }
}
</style>
