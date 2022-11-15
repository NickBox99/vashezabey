<template>
  <el-menu class="sidebar"
           :router="true"
           :default-active="activeLink"
  >
    <div class="sidebar__header">ВащеЗабей</div>

    <el-menu-item index="cms" :route="{ name: 'cms' }">
      <i class="el-icon-menu"></i>
      Главная
    </el-menu-item>

<!--    <el-submenu index="1">-->
<!--      <template slot="title"><i class="el-icon-s-data"></i>Статистика</template>-->

<!--      <el-menu-item index="cms-" :route="{ name: 'cms-' }">Кальян</el-menu-item>-->
<!--    </el-submenu>-->

<!--    <el-submenu index="2">-->
<!--      <template slot="title"><i class="el-icon-s-unfold"></i>Меню</template>-->

<!--      <el-menu-item index="cms-" :route="{ name: 'cms-' }">Кальян</el-menu-item>-->

<!--      <el-menu-item index="cms-" :route="{ name: 'cms-' }">Чай</el-menu-item>-->

<!--      <el-menu-item index="cms-" :route="{ name: 'cms-' }">Кофе</el-menu-item>-->

<!--      <el-menu-item index="cms-" :route="{ name: 'cms-' }">Напитки</el-menu-item>-->

<!--      <el-menu-item index="cms-" :route="{ name: 'cms-' }">Десерты</el-menu-item>-->

<!--      <el-menu-item index="cms-" :route="{ name: 'cms-' }">Закуски</el-menu-item>-->
<!--    </el-submenu>-->

    <el-submenu index="3">
      <template slot="title"><i class="el-icon-user-solid"></i>Администрирование</template>
      <el-menu-item index="cms-users" :route="{ name: 'cms-users' }">Пользователи</el-menu-item>
      <el-menu-item index="cms-stocks" :route="{ name: 'cms-stocks' }">Акции</el-menu-item>
      <el-menu-item index="cms-rules" :route="{ name: 'cms-rules' }">Правила</el-menu-item>
      <el-menu-item index="cms-discount-rules" :route="{ name: 'cms-discount-rules' }">Программа лояльности</el-menu-item>
      <el-menu-item index="cms-promo-codes" :route="{ name: 'cms-promo-codes' }">Промокоды</el-menu-item>
    </el-submenu>

    <el-submenu index="4">
      <template slot="title"><i class="el-icon-setting"></i>Настройки</template>
      <el-menu-item index="cms-settings" :route="{ name: 'cms-settings' }">Общее</el-menu-item>
      <el-menu-item index="cms-places" :route="{ name: 'cms-places' }">Заведения</el-menu-item>
    </el-submenu>

  </el-menu>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "CmsSidebar",
  data() {
    return {
      activeLink: null as  string | null | undefined,
    }
  },
  mounted: function(){
    this.activeLink = this.$route.name;
  },
  watch: {
    $route (to) {
      this.activeLink = to.name;
    }
  },
})
</script>

<style lang="scss" scoped>
.sidebar {
  height: 100%;
  background: var(--color-grey-1);
  border-right: var(--border-cms-default);

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    padding: 0 20px;
    height: 60px;
    font-weight: 600;
    font-size: 20px;
    border-bottom: var(--border-cms-default);
  }
}
</style>
