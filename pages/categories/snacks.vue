<template>
  <base-wrapper>
    <base-wrapper-column>
      <menu-wrapper title="Сэндвичи" :items="sandwiches" />
    </base-wrapper-column>

    <base-wrapper-column>
      <menu-wrapper title="Снэки" :items="snacks"/>
    </base-wrapper-column>
  </base-wrapper>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "snacks",
  async asyncData({ store }) {
    return {
      sandwiches: await store.dispatch('database/categories/snacks/sandwiches/getAll'),
      snacks: await store.dispatch('database/categories/snacks/getAll')
    }
  }
})
</script>
