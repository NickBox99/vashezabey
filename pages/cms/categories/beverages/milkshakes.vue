<template>
  <cms-content
    title-page="Лимонады"
    title-edit-popup="Форма меню"
    :data="categories"
    :model-edit-popup="formData"
    @edit-popup-open="updateDataEditPopup"
    :add="addCategory"
    :edit="editCategory"
    :remove="removeCategory"
    :move="moveCategory"
    :search-query="['name', 'price']"
  >
    <template slot="table">
      <el-table-column prop="name" label="Название" min-width="180">
        <template slot-scope="scope" v-html="scope.row.name">
          <div v-html="replaceTextBr(scope.row.name)"></div>
        </template>
      </el-table-column>
      <el-table-column prop="isAvailable" label="В наличие" min-width="120">
        <template slot-scope="scope">
          {{ booleanConvert(scope.row.isAvailable) }}
        </template>
      </el-table-column>
      <el-table-column prop="price" label="Цена" min-width="180">
        <template slot-scope="scope">
          <div v-html="replaceTextBr(scope.row.price)"></div>
        </template>
      </el-table-column>
      <el-table-column prop="isHeader" label="Это заголовок" min-width="120">
        <template slot-scope="scope">
          {{ booleanConvert(scope.row.isHeader) }}
        </template>
      </el-table-column>
      <el-table-column prop="isIconVisible" label="Показать иконку" min-width="120">
        <template slot-scope="scope">
          {{ booleanConvert(scope.row.isIconVisible) }}
        </template>
      </el-table-column>
    </template>

    <template slot="edit-popup">
      <el-form-item label="Название" prop="name">
        <el-input
          v-model="formData.name"
          type="textarea"
          :rows="2"
        >
          <i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
        </el-input>
      </el-form-item>

      <el-form-item label="В наличие" prop="isAvailable">
        <el-select v-model="formData.isAvailable" filterable size="w-100">
          <i slot="prefix" class="el-input__icon el-icon-place"></i>
          <el-option label="Нет" :value="0"/>
          <el-option label="Да" :value="1"/>
        </el-select>
      </el-form-item>

      <el-form-item label="Цена" prop="price">
        <el-input
          v-model="formData.price"
          type="textarea"
          :rows="2"
        >
          <i slot="prefix" class="el-input__icon el-icon-price-tag"></i>
        </el-input>
      </el-form-item>

      <el-form-item label="Показать иконку" prop="isIconVisible">
        <el-select v-model="formData.isIconVisible" filterable size="w-100">
          <i slot="prefix" class="el-input__icon el-icon-place"></i>
          <el-option label="Нет" :value="0"/>
          <el-option label="Да" :value="1"/>
        </el-select>
      </el-form-item>

      <el-form-item label="Это заголовок" prop="isHeader">
        <el-select v-model="formData.isHeader" filterable size="w-100">
          <i slot="prefix" class="el-input__icon el-icon-place"></i>
          <el-option label="Нет" :value="0"/>
          <el-option label="Да" :value="1"/>
        </el-select>
      </el-form-item>
    </template>
  </cms-content>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import { Database } from "@/types";
import {booleanConvert, replaceTextBr} from "~/helpers";

export default Vue.extend({
  name: "cms-categories-beverages-lemonade",
  layout: 'cms',
  async asyncData({ store }) {
    await store.dispatch('database/categories/beverages/lemonade/getAll');
  },
  data() {
    return {
      formData: {
        id: '',
        name: '',
        isAvailable: 1,
        price: '',
        isIconVisible: 1,
        isHeader: 0
      }
    }
  },
  methods: {
    booleanConvert,
    replaceTextBr,
    async addCategory() {
      return await this.$store.dispatch('database/categories/beverages/lemonade/add', this.formData);
    },
    async editCategory() {
      return await this.$store.dispatch('database/categories/beverages/lemonade/update', this.formData);
    },
    async removeCategory(id) {
      await this.$store.dispatch('database/categories/beverages/lemonade/remove', id);
    },
    async moveCategory({ newPos, el }) {
      await this.$store.dispatch('database/categories/beverages/lemonade/move', { newPos, el });
    },
    updateDataEditPopup(place: Database.ICategory) {
      if (place) {
        const { id, name, isAvailable, price, isIconVisible, isHeader } = place;

        this.formData = { id, name, isAvailable, price, isIconVisible, isHeader }
      }
      else {
        this.formData = {
          id: '',
          name: '',
          isAvailable: 1,
          price: '',
          isIconVisible: 1,
          isHeader: 0
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      categories: 'database/categories/beverages/lemonade/getAll'
    })
  }
})
</script>
