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

    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-s-unfold"></i>
        Меню
      </template>

      <el-submenu index="2-1">
        <template slot="title">
          <i class="el-icon-setting"></i>
          Кальян
        </template>
        <el-menu-item index="cms-categories-hookah-fruity" :route="{ name: 'cms-categories-hookah-fruity' }">Фруктовый</el-menu-item>
        <el-menu-item index="cms-categories-hookah-additional" :route="{ name: 'cms-categories-hookah-additional' }">Дополнительно</el-menu-item>
        <el-menu-item index="cms-categories-hookah-corkage-fees" :route="{ name: 'cms-categories-hookah-corkage-fees' }">Пробковый сбор</el-menu-item>
      </el-submenu>

      <el-submenu index="2-2">
        <template slot="title">
          <i class="el-icon-setting"></i>
          Чай
        </template>
        <el-menu-item index="cms-categories-tea-сlassic" :route="{ name: 'cms-categories-tea-сlassic' }">Классический</el-menu-item>
        <el-menu-item index="cms-categories-tea-сhinese" :route="{ name: 'cms-categories-tea-сhinese' }">Китайский</el-menu-item>
        <el-menu-item index="cms-categories-tea-additives" :route="{ name: 'cms-categories-tea-additives' }">Добавки</el-menu-item>
        <el-menu-item index="cms-categories-tea-not-teas" :route="{ name: 'cms-categories-tea-not-teas' }">Не чай</el-menu-item>
      </el-submenu>

      <el-menu-item index="cms-categories-coffee" :route="{ name: 'cms-categories-coffee' }">Кофе</el-menu-item>

      <el-submenu index="2-3">
        <template slot="title">
          <i class="el-icon-setting"></i>
          Напитки
        </template>
        <el-menu-item index="cms-categories-beverages-lemonade" :route="{ name: 'cms-categories-beverages-lemonade' }">Лимонады</el-menu-item>
        <el-menu-item index="cms-categories-beverages-cold-teas" :route="{ name: 'cms-categories-beverages-cold-teas' }">Холодный чай</el-menu-item>
        <el-menu-item index="cms-categories-beverages-energetic-drinks" :route="{ name: 'cms-categories-beverages-energetic-drinks' }">Энергетические напитки</el-menu-item>
        <el-menu-item index="cms-categories-beverages-milkshakes" :route="{ name: 'cms-categories-beverages-milkshakes' }">Милкшейки</el-menu-item>
        <el-menu-item index="cms-categories-beverages-juices" :route="{ name: 'cms-categories-beverages-juices' }">Соки и воды</el-menu-item>
        <el-menu-item index="cms-categories-beverages-beer" :route="{ name: 'cms-categories-beverages-beer' }">Безалкогольное пиво</el-menu-item>
      </el-submenu>

      <el-submenu index="2-4">
        <template slot="title">
          <i class="el-icon-setting"></i>
          Десерты
        </template>
        <el-menu-item index="cms-categories-desserts-sherbets" :route="{ name: 'cms-categories-desserts-sherbets' }">Щербет</el-menu-item>
        <el-menu-item index="cms-categories-desserts-ice-cream" :route="{ name: 'cms-categories-desserts-ice-cream' }">Мороженое</el-menu-item>
      </el-submenu>

      <el-submenu index="2-5">
        <template slot="title">
          <i class="el-icon-setting"></i>
          Закуски
        </template>
        <el-menu-item index="cms-categories-snacks-sandwiches" :route="{ name: 'cms-categories-snacks-sandwiches' }">Сэндвичи</el-menu-item>
        <el-menu-item index="cms-categories-snacks" :route="{ name: 'cms-categories-snacks' }">Снэки</el-menu-item>
      </el-submenu>
    </el-submenu>

    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-user-solid"></i>
        Администрирование
      </template>
      <el-menu-item index="cms-users" :route="{ name: 'cms-users' }">Пользователи</el-menu-item>
      <el-menu-item index="cms-stocks" :route="{ name: 'cms-stocks' }">Акции</el-menu-item>
      <el-menu-item index="cms-rules" :route="{ name: 'cms-rules' }">Правила</el-menu-item>
      <el-menu-item index="cms-discount-rules" :route="{ name: 'cms-discount-rules' }">Программа лояльности</el-menu-item>
      <el-menu-item index="cms-promo-codes" :route="{ name: 'cms-promo-codes' }">Промокоды</el-menu-item>
    </el-submenu>

    <el-submenu index="4">
      <template slot="title">
        <i class="el-icon-setting"></i>
        Настройки
      </template>
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
