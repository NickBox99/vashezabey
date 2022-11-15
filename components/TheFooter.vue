<template>
  <div class="footer">
    <nuxt-link to="/" exact active-class="footer__item_active" class="footer__item">
      <img src="~/assets/img/icons/menu.svg" width="24" height="24" alt="Меню" class="footer__icon">
      <div class="footer__title">Меню</div>
    </nuxt-link>
    <nuxt-link to="/stocks" active-class="footer__item_active" class="footer__item">
      <img src="~/assets/img/icons/stocks.svg" width="24" height="24" alt="Акции" class="footer__icon">
      <div class="footer__title">Акции</div>
    </nuxt-link>
    <nuxt-link to="/discount" active-class="footer__item_active" class="footer__item">
      <img src="~/assets/img/icons/card.svg" width="24" height="24" alt="Дис. карта" class="footer__icon">
      <div class="footer__title">Дис. карта</div>
    </nuxt-link>
    <nuxt-link to="/profile" active-class="footer__item_active" class="footer__item">
      <img src="~/assets/img/icons/profile.svg" width="24" height="24" alt="Профиль" class="footer__icon">
      <div class="footer__title">Профиль</div>
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Footer"
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
