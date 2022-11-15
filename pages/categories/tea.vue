<template>
  <base-wrapper>
    <base-wrapper-column>
      <menu-wrapper title="Классический" :items="classicTeas" />
      <menu-wrapper title="Китайский" :items="chineseTeas"/>
      <menu-wrapper title="Добавки" :items="additives"/>
    </base-wrapper-column>

    <base-wrapper-column>
      <menu-wrapper title="Не чай" :items="notTeas">
        <template slot="footer">
          <div class="tea__imagination">Мы не стали добавлять описание в эту теплую категорию. Тренируй воображение. Заваривается один раз.</div>
        </template>
      </menu-wrapper>
    </base-wrapper-column>
  </base-wrapper>
</template>


<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "tea",
  async asyncData({ store }) {
    return {
      classicTeas: await store.dispatch('database/getClassicTeas'),
      notTeas: await store.dispatch('database/getNotTeas'),
      chineseTeas: await store.dispatch('database/getChineseTeas'),
      additives: await store.dispatch('database/getAdditives')
    }
  }
})
</script>

<style scoped lang="scss">
  .tea__imagination {
    margin: 16px -16px -16px;
    padding: 16px;
    background: var(--color-purple);
  }
</style>
