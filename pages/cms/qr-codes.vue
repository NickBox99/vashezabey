<template>
<div class="settings">
  <el-form ref="form" :rules="rules" :model="formData">
    <el-form-item prop="reviewLink" class="settings__field">
      <span class="settings__label" slot="label">Заведение</span>

      <el-select v-model="placeId" filterable>
        <i slot="prefix" class="el-input__icon el-icon-place"></i>
        <el-option
          v-for="item in places"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item prop="instagram" class="settings__field">
      <span class="settings__label" slot="label">№ стола</span>

      <el-input v-model="formData.table">
        <i slot="prefix" class="el-input__icon el-icon-place"></i>
      </el-input>
    </el-form-item>

    <el-button type="secondary" @click="onSubmit">Скачать</el-button>
  </el-form>


  <div id="qrcode"></div>
</div>
</template>

<script lang="ts">
import Vue from "vue";
import {mapGetters} from "vuex";
import {Database, ElementUI} from "~/types";
import {getResultFormValidate} from "~/helpers";

export default Vue.extend({
  name: "qr-codes",
  layout: "cms",
  asyncData({ store }) {
    //this.places = (await this.$store.dispatch('database/places/getAll')).map(({ id, name }: Database.IPlace) => ({ label: name, value: id }));
    const { phone, reviewLink, instagram } = store.getters["settings/get"];
    return {
      formData: {
        phone,
        reviewLink,
        instagram
      } as Database.IPlace,
    }
  },
  data() {
    return {
      formData: {
        phone: '',
        reviewLink: '',
        instagram: ''
      } as Database.IPlace,

      rules: {
        phone: [
          { required: true, message: 'Выберите телефон', trigger: 'blur' }
        ],
        reviewLink: [
          { required: true, message: 'Выберите ссылку на отзывы', trigger: 'blur' }
        ],
        instagram: [
          { required: true, message: 'Выберите инстаграм', trigger: 'blur' }
        ]
      } as ElementUI.Form.IRules
    }
  },
  methods: {
    async onSubmit() {
      if (!getResultFormValidate(this.$refs.form as unknown as ElementUI.Form.IValidate)) {
        return;
      }

      if(!this.placeId) return;

      const isUpdated: boolean = await this.$store.dispatch('settings/update', { ...this.formData, id: this.placeId });

      if (isUpdated) {
        this.$notify({
          title: 'Успешно',
          message: 'Данные сохранены',
          type: 'success'
        });
      }
      else {
        this.$notify({
          title: 'Ошибка',
          message: 'Системная ошибка',
          type: 'error'
        });
      }
    },
  },
  computed: {
    ...mapGetters({
      placeName: 'settings/getName',
      placeId: 'settings/getId'
    })
  }
})
</script>

<style scoped lang="scss">
.settings {

  &__title {
    margin-bottom: 10px;
    font-size: 20px;
  }

  &__field {
    max-width: 400px;
  }

  &__label {
    color: var(--color-white)
  }
}
</style>
