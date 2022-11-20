<template>
  <el-form ref="form" :rules="rules" :model="formData" class="hookah-general">

    <el-form-item prop="firstPriceHookah" class="hookah-general__field">
      <span class="hookah-general__label" slot="label">Цена первого кальяна</span>

      <el-input v-model="formData.firstPriceHookah">
        <i slot="prefix" class="el-input__icon el-icon-place"></i>
      </el-input>
    </el-form-item>

    <el-form-item prop="secondPriceHookah" class="hookah-general__field">
      <span class="hookah-general__label" slot="label">Цена второго кальяна</span>

      <el-input v-model="formData.secondPriceHookah">
        <i slot="prefix" class="el-input__icon el-icon-place"></i>
      </el-input>
    </el-form-item>

    <el-button type="secondary" @click="onSubmit">Сохранить</el-button>
  </el-form>
</template>

<script lang="ts">
import Vue from "vue";
import { Database, ElementUI } from "~/types";
import { getResultFormValidate } from "~/helpers";

export default Vue.extend({
  name: "cms-categories-hookah-general",
  layout: "cms",
  async asyncData({ store }) {
    const hookahGeneral: Database.IHookahGeneral = await store.dispatch('database/categories/hookah/general/get');

    return {
      formData: { ...hookahGeneral }
    }
  },
  data() {
    return {
      formData: {
        id: '',
        pos: 0,
        placeId: '',
        firstPriceHookah: 0,
        secondPriceHookah: 0
      } as Database.IHookahGeneral,

      rules: {
        firstPriceHookah: [
          { required: true, message: 'Выберите цену первого кальяна', trigger: 'blur' }
        ],
        secondPriceHookah: [
          { required: true, message: 'Выберите цену второго кальяна', trigger: 'blur' }
        ]
      } as ElementUI.Form.IRules
    }
  },
  methods: {
    async onSubmit() {
      if (!getResultFormValidate(this.$refs.form as unknown as ElementUI.Form.IValidate)) {
        return;
      }

      const isUpdated: boolean = await this.$store.dispatch('database/categories/hookah/general/update', this.formData);

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
})
</script>

<style scoped lang="scss">
.hookah-general {

  &__field {
    max-width: 400px;
  }

  &__label {
    color: var(--color-white)
  }
}
</style>
