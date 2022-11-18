<template>
  <el-menu class="sidebar"
           :router="true"
           :default-active="$route.name"
  >
    <div class="sidebar__header">ВащеЗабей</div>

    <component
      v-for="item in items"
      :is="item.component"
      :key="item.route"
      :index="item.route"
      :route="item.component === 'el-menu-item' ? { name: item.route } : false"
    >
      <template slot="title">
        <i v-if="item.icon" :class="`el-icon-${item.icon}`"></i>
        {{ item.title }}
      </template>

      <template v-if="item.componentChildren">
        <component
          v-for="item in item.componentChildren"
          :is="item.component"
          :key="item.route"
          :index="item.route"
          :route="item.component === 'el-menu-item' ? { name: item.route } : false"
        >
          <template slot="title">
            <i v-if="item.icon" :class="`el-icon-${item.icon}`"></i>
            {{ item.title }}
          </template>

          <template v-if="item.componentChildren">
            <component
              v-for="item in item.componentChildren"
              :is="item.component"
              :key="item.route"
              :index="item.route"
              :route="item.component === 'el-menu-item' ? { name: item.route } : false"
            >
              <template slot="title">
                <i v-if="item.icon" :class="`el-icon-${item.icon}`"></i>
                {{ item.title }}
              </template>
            </component>
          </template>
        </component>
      </template>
    </component>
  </el-menu>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "cms-sidebar",
  data() {
    return {
      items: [
        { route: 'cms', icon: 'menu', title: 'Главная', component: 'el-menu-item' },
        { route: 'menu', icon: 's-unfold', title: 'Меню', component: 'el-submenu',
          componentChildren: [
            { route: 'menu-hookah', icon: 'setting', title: 'Кальян', component: 'el-submenu',
              componentChildren: [
                { route: 'cms-categories-hookah-fruity', title: 'Фруктовый', component: 'el-menu-item' },
                { route: 'cms-categories-hookah-additional', title: 'Дополнительно', component: 'el-menu-item' },
                { route: 'cms-categories-hookah-corkage-fees', title: 'Пробковый сбор', component: 'el-menu-item' }
              ]
            },
            { route: 'menu-tea', icon: 'setting', title: 'Чай', component: 'el-submenu',
              componentChildren: [
                { route: 'cms-categories-tea-сlassic', title: 'Классический', component: 'el-menu-item' },
                { route: 'cms-categories-tea-сhinese', title: 'Китайский', component: 'el-menu-item' },
                { route: 'cms-categories-tea-additives', title: 'Добавки', component: 'el-menu-item' },
                { route: 'cms-categories-tea-not-teas', title: 'Не чай', component: 'el-menu-item' }
              ]
            },
            { route: 'cms-categories-coffee', title: 'Кофе', component: 'el-menu-item' },
            { route: 'menu-beverages', icon: 'setting', title: 'Напитки', component: 'el-submenu',
              componentChildren: [
                { route: 'cms-categories-beverages-lemonade', title: 'Лимонады', component: 'el-menu-item' },
                { route: 'cms-categories-beverages-cold-teas', title: 'Холодный чай', component: 'el-menu-item' },
                { route: 'cms-categories-beverages-energetic-drinks', title: 'Энергетические напитки', component: 'el-menu-item' },
                { route: 'cms-categories-beverages-milkshakes', title: 'Милкшейки', component: 'el-menu-item' },
                { route: 'cms-categories-beverages-juices', title: 'Соки и воды', component: 'el-menu-item' },
                { route: 'cms-categories-beverages-beer', title: 'Безалкогольное пиво', component: 'el-menu-item' }
              ]
            },
            { route: 'menu-desserts', icon: 'setting', title: 'Десерты', component: 'el-submenu',
              componentChildren: [
                { route: 'cms-categories-desserts-sherbets', title: 'Щербет', component: 'el-menu-item' },
                { route: 'cms-categories-desserts-ice-cream', title: 'Мороженое', component: 'el-menu-item' }
              ]
            },
            { route: 'menu-snacks', icon: 'setting', title: 'Закуски', component: 'el-submenu',
              componentChildren: [
                { route: 'cms-categories-snacks-sandwiches', title: 'Сэндвичи', component: 'el-menu-item' },
                { route: 'cms-categories-snacks', title: 'Снэки', component: 'el-menu-item' }
              ]
            }
          ]
        },
        { route: 'admin-panel', icon: 'user-solid', title: 'Администрирование', component: 'el-submenu',
          componentChildren: [
            { route: 'cms-users', title: 'Пользователи', component: 'el-menu-item' },
            { route: 'cms-stocks', title: 'Акции', component: 'el-menu-item' },
            { route: 'cms-rules', title: 'Правила', component: 'el-menu-item' },
            { route: 'cms-discount-rules', title: 'Программа лояльности', component: 'el-menu-item' },
            { route: 'cms-promo-codes', title: 'Промокоды', component: 'el-menu-item' }
          ]
        },
        { route: 'settings', icon: 'setting', title: 'Настройки', component: 'el-submenu',
          componentChildren: [
            { route: 'cms-settings', title: 'Общее', component: 'el-menu-item' },
            { route: 'cms-places', title: 'Заведения', component: 'el-menu-item' }
          ]
        }
      ]
    }
  }
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
