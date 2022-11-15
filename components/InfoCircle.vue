<template>
  <div
    :class="['info-circle', {
      'info-circle_small': type === 'small'
    }]"
  >
    <slot/>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";

export default Vue.extend({
  name: "InfoCircle",
  props: {
    type: {
      type: String as PropType<"small" | "large">,
      default: 'large'
    }
  }
})
</script>

<style scoped lang="scss">
.info-circle {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  font-weight: 600;
  font-size: 32px;
  background: var(--background-circle);
  border: var(--border-circle);
  border-radius: var(--border-radius-rounded);
  box-shadow: var(--shadow-circle);

  &_small {
    width: 60px;
    height: 60px;
    font-size: 14px;
  }
}
</style>
