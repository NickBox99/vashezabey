<template>
  <div class="main">
    <the-welcome class="main__welcome"/>

    <div class="container">
      <h3 class="main__subtitle">Меню</h3>
      <categories-list class="main__menu"/>

      <h3 class="main__subtitle">Акции
        <nuxt-link to="/stocks" class="main__stocks">Смотреть все</nuxt-link>
      </h3>
      <stocks-list class="main__stocks-list" :max-size="2"/>

      <h3 class="main__subtitle">Правила заведения</h3>
      <nuxt-link to="/rules">
        <el-button type="secondary" class="main__read" size="w-100">Прочитать</el-button>
      </nuxt-link>

      <template v-if="!isAuth">
        <h3 class="main__subtitle">Авторизуйтесь чтобы получить скидку</h3>
        <nuxt-link to="/login">
          <el-button type="primary" class="main__login" size="w-100">Войти</el-button>
        </nuxt-link>
      </template>

      <div class="main__wish">Приятного отдыха!</div>
      <div class="main__footer">

        <a :href="settings.reviewLink" target="_blank">
          <el-button type="review" size="w-100">Написать отзыв</el-button>
        </a>

        <a :href="`tel:${ settings.phone }`">
          <el-button type="contact" size="w-100">Связаться</el-button>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex'

export default Vue.extend({
  name: 'index',
  layout: 'home',
  computed: {
    ...mapGetters({
      isAuth: 'auth/isAuth',
      settings: 'settings/get'
    })
  }
})
</script>

<style lang="scss">
.main {
  &__welcome, &__menu, &__stocks-list, &__read, &__login {
    margin-bottom: 36px;
  }

  &__subtitle, &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__subtitle {
    margin-bottom: 24px;
    color: var(--color-white-opac50);
  }

  &__stocks {
    display: flex;
    align-items: center;

    &:after {
      content: '';
      margin-left: 10.44px;
      width: 5.56px;
      height: 9px;
      transform: rotate(180deg);
      background: url('~/assets/img/icons/arrow.svg') no-repeat center center;
    }
  }

  &__wish {
    padding: 24px 0;
    font-weight: 600;
    font-size: 16px;
    border-top: var(--border-default);
  }

  &__footer {
    display: grid;
    grid-gap: var(--size-gap);
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
