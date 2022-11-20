<template>
  <div>
    <menu-item
      v-for="item in items"
      :key="item.id"
      v-bind="item"
    />
  </div>
</template>

<script>

export default {
  name: "categories-coffee",
  async asyncData({ store }) {
    return {
      items: await store.dispatch('database/categories/coffee/getAll')
    }
  }
}
</script>
