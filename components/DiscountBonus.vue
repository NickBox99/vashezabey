<template>
<div class="discount-bonus">
  <div class="discount-bonus__bonus">
    <h2 class="discount-bonus__title">Оставь отзыв и получи скидку</h2>
    <a :href="settings.reviewLink" target="_blank">
      <el-button type="primary" size="w-100">Написать отзыв</el-button>
    </a>
  </div>
  <div class="discount-bonus__bonus">
    <h2 class="discount-bonus__title">Примени промокод на  временную ссылку</h2>
    <el-button type="secondary" @click="openPopup" size="w-100">Ввести промокод</el-button>
  </div>

  <el-dialog width="300px" top=""
             title="Введите промокод, чтобы получить временную скидку"
             :visible.sync="isShowPopup"
  >
    <el-input
      placeholder="1234"
      v-model.trim="promoCode">
      <i slot="prefix" class="el-input__icon el-icon-star-on"></i>
    </el-input>

    <div slot="footer" class="dialog-footer">
      <el-button type="primary" size="w-100" @click="onSubmit">Применить</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";

export default Vue.extend({
  name: "DiscountBonus",
  data() {
    return {
      isShowPopup: false,
      promoCode: null
    }
  },
  methods: {
    openPopup() {
      this.isShowPopup = true;
    },
    async onSubmit() {
      this.$notify({
        title: 'Промокод',
        message: 'Истек срок годности',
        type: 'error'
      });
    }
  },
  computed: {
    ...mapGetters({
      settings: 'settings/get'
    })
  }
})
</script>

<style scoped lang="scss">
.discount-bonus {
  display: grid;
  gap: var(--size-gap);
  grid-template-columns: repeat(2, 1fr);
  padding: 36px 0;
  border: {
    top: var(--border-default);
    bottom: var(--border-default);
  };

  &__title {
    font-size: 14px;
    margin-bottom: 24px;
  }

  &__promo-code {
    margin-bottom: 16px;
  }

  @media screen and (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: unset;

    &__bonus {
      &:first-child {
        margin-bottom: 36px;
        padding-bottom: 36px;
        border-bottom: var(--border-default);
      }
    }
  }
}
</style>
