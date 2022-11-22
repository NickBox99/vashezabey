<template>
  <div
    :class="['menu-item', {
      'menu-item_star-disable': !isIconVisible,
      'menu-item_dotted-disable': !price,
      'menu-item_not-available': !isAvailable,
    }]"
  >
    <div class="menu-item__name" v-html="textToHtmlText(name)"></div>
    <div class="menu-item__price" v-if="price" v-html="textToHtmlText(price)"></div>
  </div>
</template>

<script>
import Vue from "vue";
import {textToHtmlText} from "@/helpers";

export default Vue.extend({
  name: "menu-item",
  props: {
    name: {
      type: String,
      default: ""
    },
    price: {
      type: String | null,
      default: null
    },
    isAvailable: {
      type: Number,
      default: 1
    },
    isIconVisible: {
      type: Number,
      default: 1
    }
  },
  methods: {
    textToHtmlText
  }
})
</script>

<style lang="scss">
.menu-item {
  display: flex;
  color: var(--color-white-opac70);

  &_not-available {
    color: var(--color-white-opac20);
  }

  &:not(:last-child) {
    margin-bottom: 12px;
  }

  &__name {
    display: flex;
    align-items: baseline;

    &, &:after {
      flex-grow: 1;
    }
  }

  &:not(&_dotted-disable) {
    .menu-item__name:after {
      content: '';
      margin: 0 8px;
      border-bottom: var(--border-default-dotted);
    }
  }

  &:not(&_star-disable) {
    .menu-item__name:before {
      content: '';
      transform: translateY(2px);
      margin-right: 6px;
      width: 12px;
      height: 12px;
      background: url('~/assets/img/icons/star.svg') no-repeat center center;
    }
  }

  &__price {
    white-space: nowrap;
    text-align: right;

    br {
      content: '';
      display: block;
      margin-bottom: 5px;
    }
  }
}
</style>

