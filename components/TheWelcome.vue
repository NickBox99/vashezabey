<template>
  <div class="welcome">
    <a :href="`https://www.instagram.com/${settings.instagram}`" class="welcome__social" target="_blank">
      <img class="welcome__instagram" src="~/assets/img/icons/instagram.svg" width="50" height="50" alt="Наш инстаграм">
    </a>
    <div class="motto">
      <div class="motto__content">Самые дымные кальяны тут</div>
      <div class="motto__content">Самые дымные кальяны тут</div>
      <div class="motto__content">Самые дымные кальяны тут</div>
    </div>
    <img class="welcome__img" src="~/assets/img/welcome-bg.jpg" width="634" height="516" alt="Ваще Забей">

    <div class="container">
      <h1 class="welcome__title">Добро пожаловать в <span class="welcome__company">Ваще Забей</span>!</h1>
      <el-button type="secondary" @click="waiterCall" size="w-100">Позвать официанта</el-button>
    </div>

    <el-dialog width="300px" top=""
               title="Официант сейчас подойдет"
               :visible.sync="isShowPopup"
    >
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="w-100" @click="closePopup">Применить</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters } from "vuex";

export default Vue.extend({
  name: "the-welcome",
  data() {
    return {
      isShowPopup: false
    }
  },
  methods: {
    waiterCall() {
      this.$messenger.telegram.waiterCall({
        table: this.$route.query.table? String(this.$route.query.table) : "Стол не обнаружен",
        cardId: this.user?.cardId
      });
      this.isShowPopup = true;
    },

    closePopup() {
      this.isShowPopup = false;
    }
  },
  computed: {
    ...mapGetters({
      settings: 'settings/get',
      user: 'auth/getUser'
    })
  }
})
</script>

<style scoped lang="scss">
.motto {
  --animate-moto-start-x: -160px;
  --animate-moto-end-x: -475px;

  position: absolute;
  top: -135px;
  left: 0;
  transform: rotate(-35.35deg) translateX(var(--animate-moto-start-x));
  z-index: var(--z-index-motto);
  display: flex;
  padding: 12.3px 50px;
  background: var(--color-grey-1);
  animation: moto 10s infinite linear;

  @keyframes moto {
    0%   {
      transform: rotate(-35.35deg) translateX(var(--animate-moto-start-x));
    }

    100% {
      transform: rotate(-35.35deg) translateX(var(--animate-moto-end-x));
    }
  }

  &__content {
    display: flex;
    justify-content: space-between;
    margin-right: 19.22px;
    font-weight: 600;
    font-size: 18.4553px;
    white-space: nowrap;

    &:before {
      content: '';
      margin-right: 18.46px;
      width: 24.61px;
      height: 24.61px;
      background: url('~/assets/img/icons/star.png') no-repeat center center / cover;
    }
  }

  @media screen and (max-width: 640px) {
    --animate-moto-start-x: -116px;
    --animate-moto-end-x: -471px;
    padding: 6px 50px;
    top: -100px;

    &__content {
      font-size: 9.31px;

      &:before {
        width: 12.42px;
        height: 12.42px;
      }
    }
  }
}

.welcome {
  position: relative;
  overflow: hidden;

  --z-index-welcome-smoke: 1;
  --z-index-welcome-social: 2;

  &:before {
    content: '';
    position: absolute;
    top:  0;
    left: 0;
    z-index: var(--z-index-welcome-smoke);
    display: block;
    width: 100%;
    height: 126.8px;
    background: var(--color-gradient-black-smoke);
    transform: matrix(1, 0, 0, -1, 0, 0);
  }

  &__social {
    position: absolute;
    top: 15px;
    left: 0;
    z-index: var(--z-index-welcome-social);
    cursor: pointer;
  }

  &__img {
    margin-bottom: 24px;
    width: 100%;
    height: auto;
  }

  &__title {
    margin-bottom: 24px;
    font-size: 16px;
  }

  &__company {
    color: var(--color-text-brand);
  }
}
</style>
