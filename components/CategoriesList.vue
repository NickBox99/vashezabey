<template>
  <div class="categories">
    <nuxt-link class="categories__item"
         v-for="cat in categories"
         :key="cat.id"
         :to="{ path: `/categories/${cat.type}` }"
    >
      {{ cat.name }}
      <div :class="`categories__icon categories__icon_${cat.type}`"></div>
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";

export default Vue.extend({
  name: "CategoriesList",
  data() {
    return {
      categories: [
        {
          id: 1,
          name: 'Кальян',
          type: 'hookah'
        },
        {
          id: 2,
          name: 'Чай',
          type: 'tea'
        },
        {
          id: 3,
          name: 'Кофе',
          type: 'coffee'
        },
        {
          id: 4,
          name: 'Напитки',
          type: 'beverages'
        },
        {
          id: 5,
          name: 'Десерты',
          type: 'desserts'
        },
        {
          id: 6,
          name: 'Закуски',
          type: 'snacks'
        }
      ]
    }
  }
})
</script>

<style scoped lang="scss">
.categories {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--size-gap);

  @media screen and (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  &__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 8px 8px 16px;
    font-size: 14px;
    color: var(--color-white-opac70);
    background: var(--color-grey-1);
    border-radius: var(--border-radius-large);
    cursor: pointer;

    @media screen and (max-width: 335px) {
      padding-left: 12px;
    }
  }

  &__icon {
    width: 44px;
    height: 44px;
    background-position: center center;
    background-repeat: no-repeat;
    border-radius: var(--border-radius-large);

    &_hookah {
      background-image: url('~/assets/img/icons/categories/hookah.svg'), var(--background-categories-hookah);
    }

    &_tea {
      background-image: url('~/assets/img/icons/categories/tea.svg'), var(--background-categories-tea);
    }

    &_coffee {
      background-image: url('~/assets/img/icons/categories/coffee.svg'), var(--background-categories-coffee);
    }

    &_beverages {
      background-image: url('~/assets/img/icons/categories/drinks.svg'), var(--background-categories-drinks);
    }

    &_desserts {
      background-image: url('~/assets/img/icons/categories/desserts.svg'),  var(--background-categories-desserts);
    }

    &_snacks {
      background-image: url('~/assets/img/icons/categories/snacks.svg'), var(--background-categories-snacks);
    }
  }
}
</style>
