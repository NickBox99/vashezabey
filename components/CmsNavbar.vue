<template>
  <div class="navbar">
    <el-select v-model="placeId" filterable>
      <i slot="prefix" class="el-input__icon el-icon-place"></i>
      <el-option
        v-for="item in places"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>


    <el-button type="secondary" class="navbar__button" @click="openPopup">Открыть счет</el-button>

    <el-dialog width="500px" top="" title="Открыть счет"
               :visible.sync="isShowPopup"
    >
      <el-form ref="form"
        :rules="rules"
        :model="formData"
      >
        <el-form-item label="Клиент" prop="id">
          <el-select v-model="formData.id" filterable size="w-100">
            <i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
            <el-option
              v-for="item in clients"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Начислить сумму" prop="accumulated">
          <el-input
            v-model.number="formData.accumulated">
            <i slot="prefix" class="el-input__icon el-icon-money"></i>
          </el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onSubmit">Открыть счет</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import { getResultFormValidate } from "~/helpers";
import { ElementUI, Database } from "~/types";

export default Vue.extend({
  name: "cms-navbar",
  data() {
    return {
      isShowPopup: false,
      clients: [] as ElementUI.ISelect[],
      places: [] as ElementUI.ISelect[],
      placeId: null as null | string,

      formData: {
        id: null as null | string,
        accumulated: null as null | number
      },

      rules: {
        id: [
          { required: true, message: 'Выберите клиента', trigger: 'blur' }
        ],

        accumulated: [
          { required: true, message: 'Введите сумму', trigger: 'blur' }
        ]
      }
    }
  },
  async created() {
    this.clients = (await this.$store.dispatch('database/users/getAll')).map(({ id, cardId, name }: Database.IUser) => ({ label: `[${cardId}] ${name}`, value: id }));
    this.places = (await this.$store.dispatch('database/places/getAll')).map(({ id, name }: Database.IPlace) => ({ label: name, value: id }));
    this.placeId = this.$store.getters["settings/getId"];
  },
  methods: {
    openPopup() {
      this.isShowPopup = true;
    },

    async onSubmit() {
      if (!getResultFormValidate(this.$refs.form as unknown as ElementUI.Form.IValidate)) {
        return;
      }

      if (await this.$store.dispatch('database/users/addAccumulated', this.formData)) {
        this.$notify({
          title: 'Успешно',
          message: 'Данные отправлены',
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

      this.formData = { id: null, accumulated: null };

      this.isShowPopup = false;
    }
  }
})
</script>

<style scoped lang="scss">
.navbar {
  display: flex;
  align-items: center;
  padding: 0 20px;
  height: 60px;
  background: var(--color-grey-1);
  border-bottom: var(--border-cms-default);

  &__button {
    margin-left: auto;
  }
}
</style>
