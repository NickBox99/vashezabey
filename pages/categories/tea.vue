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
  name: "categories-tea",
  async asyncData({ store }) {
    return {
      classicTeas: await store.dispatch('database/categories/tea/сlassic/getAll'),
      notTeas: await store.dispatch('database/categories/tea/not-teas/getAll'),
      chineseTeas: await store.dispatch('database/categories/tea/сhinese/getAll'),
      additives: await store.dispatch('database/categories/tea/additives/getAll')
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
