<template>
  <base-wrapper>
    <base-wrapper-column>
      <menu-wrapper title="Лимонады" :items="lemonades" />
      <menu-wrapper title="Холодный чай" :items="coldTeas" />
      <menu-wrapper title="Энергетические напитки" :items="energeticDrinks" />
    </base-wrapper-column>

    <base-wrapper-column>
      <menu-wrapper title="Милкшейки" :items="milkshakes" />
      <menu-wrapper title="Соки и воды" :items="juices"/>
      <menu-wrapper title="Безалкогольное пиво" :items="beer"/>
    </base-wrapper-column>
  </base-wrapper>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "drinks",
  async asyncData({ store }) {
    return {
      lemonades: await store.dispatch('database/getLemonades'),
      milkshakes: await store.dispatch('database/getMilkshakes'),
      coldTeas: await store.dispatch('database/getColdTeas'),
      juices: await store.dispatch('database/getJuices'),
      energeticDrinks: await store.dispatch('database/getEnergeticDrinks'),
      beer: await store.dispatch('database/getBeer')
    }
  }
})
</script>

