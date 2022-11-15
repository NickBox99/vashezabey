<template>
  <base-wrapper>
    <base-wrapper-column>
      <menu-wrapper title="Щербет" :items="sherbet" />
    </base-wrapper-column>

    <base-wrapper-column>
      <menu-wrapper title="Мороженое" :items="iceCream"/>
    </base-wrapper-column>
  </base-wrapper>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "desserts",
  async asyncData({ store }) {
    return {
      sherbet: await store.dispatch('database/getSherbets'),
      iceCream: await store.dispatch('database/getIceCream')
    }
  }
})
</script>
