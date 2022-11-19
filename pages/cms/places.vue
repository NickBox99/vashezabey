<template>
  <cms-content
    title-page="Заведения"
    title-edit-popup="Форма заведения"
    :data="places"
    :rules-edit-popup="rules"
    :model-edit-popup="formData"
    @edit-popup-open="updateDataEditPopup"
    :add="addPlace"
    :edit="editPlace"
    :remove="removePlace"
    :move="movePlace"
    :search-query="['name', 'address', 'city', 'country']"
    :disable-add="isRootPermission"
    :disable-remove="isRootPermission"
  >

    <template slot="table">
      <el-table-column prop="name" label="Название" min-width="180"/>
      <el-table-column prop="address" label="Адрес" min-width="180"/>
      <el-table-column prop="country" label="Страна" min-width="120"/>
      <el-table-column prop="city" label="Город" min-width="120"/>
    </template>

    <template slot="edit-popup">
      <el-form-item label="Название" prop="name">
        <el-input
          v-model="formData.name">
          <i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
        </el-input>
      </el-form-item>

      <el-form-item label="Адрес" prop="address">
        <el-input
          v-model="formData.address">
          <i slot="prefix" class="el-input__icon el-icon-location-outline"></i>
        </el-input>
      </el-form-item>

      <el-form-item label="Страна" prop="country">
        <el-input
          v-model="formData.country">
          <i slot="prefix" class="el-input__icon el-icon-location-outline"></i>
        </el-input>
      </el-form-item>

      <el-form-item label="Город" prop="city">
        <el-input
          v-model="formData.city">
          <i slot="prefix" class="el-input__icon el-icon-location-outline"></i>
        </el-input>
      </el-form-item>
    </template>

  </cms-content>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import { Database, ElementUI } from "@/types";

export default Vue.extend({
  name: "cms-places",
  layout: 'cms',
  async asyncData({ store }) {
    await store.dispatch('database/places/getAll');
  },
  data() {
    return {
      formData: {
        id: '',
        name: '',
        address: '',
        country: '',
        city: ''
      } as Database.IPlace,
      rules: {
        name: [
          { required: true, message: 'Выберите имя', trigger: 'blur' }
        ]
      } as ElementUI.Form.IRules
    }
  },
  methods: {
    async addPlace(): Promise<boolean> {
      return this.$store.dispatch('database/places/add', this.formData);
    },
    async editPlace(): Promise<boolean> {
      return this.$store.dispatch('database/places/update', this.formData);
    },
    async removePlace(id): Promise<boolean> {
      return this.$store.dispatch('database/places/remove', id);
    },
    async movePlace({ newPos, el }): Promise<boolean> {
      return this.$store.dispatch('database/places/move', { newPos, el });
    },
    updateDataEditPopup(place: Database.IPlace) {
      if (place) {
        this.formData = place;
      }
      else {
        this.formData = {
          id: '',
          name: '',
          address: '',
          country: '',
          city: '',
          pos: 0,
          phone: '',
          reviewLink: '',
          instagram: ''
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      places: 'database/places/getAll',
      user: 'auth/getUser'
    }),
    isRootPermission(): boolean {
      return this.user.role !== Database.IUserRole.developer;
    }
  }
})
</script>
