<template>
  <el-container class="cms">
    <el-aside>
      <cms-sidebar/>
    </el-aside>

    <el-container>
      <el-header>
        <cms-navbar/>
      </el-header>

      <el-main>
        <div class="cms__wrapper">
          <nuxt/>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "cms",
  middleware: 'auth'
})
</script>

<style scoped lang="scss">
.cms {
  height: 100vh;
  min-width: 1000px;

  &__wrapper {
    padding: 10px;
    height: 100%;
    background: var(--color-grey-1);
    border: var(--border-radius-medium);
  }
}
</style>
