<template>
  <div class="layout">
    <Nuxt/>
    <TheFooter/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "main",
  middleware: 'auth'
})
</script>
