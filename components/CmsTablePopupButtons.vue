<template>
  <div class="dialog-footer">
    <el-button type="primary" @click="onSave">Сохранить</el-button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "cms-table-popup-buttons",
  methods: {
    onSave() {
      this.$emit('save');
    }
  }
})
</script>
