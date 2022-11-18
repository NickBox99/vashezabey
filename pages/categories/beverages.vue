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
  name: "beverages",
  async asyncData({ store }) {
    return {
      lemonades: await store.dispatch('database/categories/beverages/lemonade/getAll'),
      milkshakes: await store.dispatch('database/categories/beverages/milkshakes/getAll'),
      coldTeas: await store.dispatch('database/categories/beverages/cold-teas/getAll'),
      juices: await store.dispatch('database/categories/beverages/juices/getAll'),
      energeticDrinks: await store.dispatch('database/categories/beverages/energetic-drinks/getAll'),
      beer: await store.dispatch('database/categories/beverages/beer/getAll')
    }
  }
})
</script>

