<template>
  <div class="hookah">
    <div class="hookah__header">
      <div class="hookah__estimations">
        <div class="hookah__estimation">1-5 чел.</div>
        <div class="hookah__estimation">6-8 чел.</div>
        <div class="hookah__estimation">9-11 чел.</div>
      </div>

      <div class="hookah__hookah-price">
        <menu-item name="Стоимость первого кальяна" :price="`${ pricesHookahs[0] } руб`" :icon-visible="false"/>
        <menu-item name="Стоимость второго кальяна" :price="`${ pricesHookahs[1] } руб`" :icon-visible="false"/>
      </div>
    </div>

    <div class="hookah__why why">
      <div class="why__title">Почему?</div>
      <div class="why__description">Когда один кальян курят более 3 человек, нарушается температурный режим чаши, что влияет на время жизни кальяна в негативную сторону.</div>
    </div>

    <base-wrapper>
      <base-wrapper-column>
        <menu-wrapper title="Фруктовый" :items="fruitHookahs" />
        <menu-wrapper title="Пробковый сбор" :items="corkageFees" />
      </base-wrapper-column>

      <base-wrapper-column stretch>
        <menu-wrapper class="hookah__menu-additionally" title="Дополнительно" :items="additionallyHookahs">
          <template slot="footer">
            <div class="hookah__use-time">* Время использования 2 часа</div>
          </template>
        </menu-wrapper>
      </base-wrapper-column>
    </base-wrapper>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "hookah",
  async asyncData({ store }) {
    return {
      pricesHookahs: await store.dispatch('database/getPricesHookahs'),
      fruitHookahs: await store.dispatch('database/getFruitHookahs'),
      corkageFees: await store.dispatch('database/getCorkageFees'),
      additionallyHookahs: await store.dispatch('database/getAdditionallyHookahs')
    }
  }
})
</script>

<style scoped lang="scss">
.why {
  position: relative;
  padding: 16px;
  width: 100%;
  color: var(--color-white);
  background: var(--color-purple);
  border-radius: var(--border-radius-medium);

  &:after {
    content: '';
    position: absolute;
    top: -20px;
    left: 22%;
    border: 10px solid transparent;
    border-bottom: 10px solid var(--color-purple);
  }

  &__title {
    margin-bottom: 12px;
    font-weight: 600;
    font-size: 14px;
  }

  &__description {
    line-height: 18px;
  }
}

.hookah {
  &__header {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--size-gap);
    margin-bottom: 25px;
  }

  &__estimation {
    position: relative;
    display: inline-block;
    padding: 58px 0 16px;
    width: 31.035%;
    color: var(--color-white-opac70);
    text-align: center;
    background: var(--color-grey-1);
    border-radius: var(--border-radius-medium);

    &s {
      display: flex;
      justify-content: space-between;
    }

    &:after {
      content: '';
      position: absolute;
      top: 16px;
      left: 50%;
      transform: translateX(-50%);
      height: 24px;
      background:  url('~/assets/img/icons/hookahs.svg');
    }

    &:first-child:after {
      width: 18px;
    }

    &:nth-child(2):after {
      width: 42px;
    }

    &:last-child:after {
      width: 66px;
    }
  }

  &__why {
    margin-bottom: 24px;
  }

  &__menu-additionally {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  &__use-time {
    margin-top: auto;
    color: var(--color-white-opac20);
  }
}

@media screen and (max-width: 640px) {
  .why:after {
    left: 50%;
    transform: translateX(-50%);
  }

  .hookah {
    &__header {
      grid-template-columns: 1fr;
      gap: 24px;
    }

    &__hookah-price {
      order: -1;
    }
  }
}
</style>
