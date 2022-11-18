<template>
  <div
    :class="['wrapper', {
      'wrapper_stretch': stretch
    }]"
  >
    <slot/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "base-wrapper",
  props: {
    stretch: {
      type: Boolean,
      default: false
    }
  }
})
</script>


<style lang="scss" scoped>
.wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: var(--size-gap);

  &:not(&_stretch) {
    align-items: flex-start;
  }

  @media screen and (max-width: 640px) {
    grid-template-columns: 1fr;
  }
}
</style>
