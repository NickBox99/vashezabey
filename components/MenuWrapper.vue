<template>
  <div class="menu-wrapper">
    <h2 class="menu-wrapper__title">{{ title }}</h2>

    <div
      v-if="subheader.length"
      :class="['menu-wrapper-subheader', { 'menu-wrapper-subheader_border-default': subheader.length === 1 }]"
    >
      <div class="menu-wrapper-subheader__item"
           v-for="item in subheader"
      >
        <div class="menu-wrapper-subheader__description" v-if="item.name">{{item.name}}</div>
        <div class="menu-wrapper-subheader__price">{{item.price}}</div>
      </div>
    </div>

    <menu-item
      v-for="item in array"
      :key="item.id"
      v-bind="item"
    />

    <slot name="footer"/>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { Database } from "~/types";

export default Vue.extend({
  name: "MenuWrapper",
  props: {
    title: {
      type: String,
      default: ""
    },
    items: {
      type: Array as PropType<Database.IMenu[]>,
      default: () => ([])
    }
  },
  data() {
    const subheader: Database.IMenu[] = [], array: Database.IMenu[] = [];

    this.items.forEach(item => {
      //@ts-ignore
      if (item.type) {
        subheader.push(item);
      }
      else {
        array.push(item);
      }
    });

    return { subheader, array }
  }
})
</script>

<style lang="scss" scoped>
.menu-wrapper-subheader {
  display: flex;
  gap: var(--size-gap);
  margin-bottom: 16px;

  &__item {
    display: flex;
    font-weight: 600;

    &:not(:last-child) {
      position: relative;

      &:after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        width: 1px;
        right: calc(-1 * (var(--size-gap) / 2) - 1px);
        background: var(--color-white-opac10);
      }
    }
  }

  &__description, &__price {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 64px;
    height: 30px;
    border-radius: var(--border-radius-medium);
  }

  &:not(&_border-default) {
    .menu-wrapper-subheader {
      &__description {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }

      &__price {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
  }

  &__description {
    background: var(--color-grey-2);
  }

  &__price {
    color: var(--color-orange);
    background: var(--color-orange-opac40);
  }

  @media screen and (max-width: 640px) {
    &-subheader {
      --size-gap: 16px;

      &__description, &__price {
        width: 58px;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.menu-wrapper {
  padding: 12px 16px 16px;
  background: var(--color-grey-1);
  border-radius: var(--border-radius-large);
  overflow: hidden;

  &__title {
    margin: -12px -16px 16px;
    padding: 12px 16px;
    font-size: 14px;
    background: var(--color-grey-2);
  }
}
</style>
