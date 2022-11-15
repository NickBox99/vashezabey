<template>
  <div
    :class="['base-wrapper-col', {
      'base-wrapper-col_stretch': stretch
    }]"
  >
    <slot/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "BaseWrapperCol",
  props: {
    stretch: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style lang="scss" scoped>
.base-wrapper-col {
  display: grid;
  gap: var(--size-gap);

  &_stretch {
    align-self: stretch;
  }
}
</style>
