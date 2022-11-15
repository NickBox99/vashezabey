<template>
<div class="settings">
  <h2 class="settings__title">Настройки ({{ placeName }})</h2>

  <el-form ref="form" :rules="rules" :model="formData">
    <el-form-item prop="phone" class="settings__field">
      <span class="settings__label" slot="label">Телефон для связи</span>

      <el-input v-model="formData.phone" v-mask-phone>
        <i slot="prefix" class="el-input__icon el-icon-place"></i>
      </el-input>
    </el-form-item>

    <el-form-item prop="reviewLink" class="settings__field">
      <span class="settings__label" slot="label">Ссылка для отзывов</span>

      <el-input v-model="formData.reviewLink">
        <i slot="prefix" class="el-input__icon el-icon-place"></i>
      </el-input>
    </el-form-item>

    <el-form-item prop="instagram" class="settings__field">
      <span class="settings__label" slot="label">Профиль инстаграм</span>

      <el-input v-model="formData.instagram">
        <i slot="prefix" class="el-input__icon el-icon-place"></i>
      </el-input>
    </el-form-item>

    <el-button type="secondary" @click="onSubmit">Сохранить</el-button>
  </el-form>
</div>
</template>

<script lang="ts">
import Vue from "vue";
import {mapGetters} from "vuex";

export default Vue.extend({
  name: "cms-settings",
  layout: "cms",
  asyncData({ store }) {
    const { phone, reviewLink, instagram } = store.getters["settings/get"];
    return {
      formData: {
        phone,
        reviewLink,
        instagram
      }
    }
  },
  data() {
    return {
      formData: {
        phone: '',
        reviewLink: '',
        instagram: ''
      },

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
      }
    }
  },
  methods: {
    async onSubmit() {
      let isValid = false;
      //@ts-ignore
      this.$refs.form.validate((valid: boolean) => isValid = valid);
      if(!isValid) {
        return;
      }

      const isUpdated = await this.$store.dispatch('settings/update', { id: this.placeId, ...this.formData });

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
