<template>
  <cms-content
    title-page="Промокоды"
    title-edit-popup="Форма промокода"
    :data="promoCodes"
    :rules-edit-popup="rules"
    :model-edit-popup="formData"
    @edit-popup-open="updateDataEditPopup"
    :add="addPromoCode"
    :edit="editPromoCode"
    :remove="removePromoCode"
    :move="movePromoCode"
    :search-query="['code', 'discount', 'validity']"
  >
    <template slot="table">
      <el-table-column prop="code" label="Код" min-width="180"/>
      <el-table-column prop="discount" label="Скидка" min-width="180"/>
      <el-table-column prop="validity" label="Срок действия" min-width="180">
        <template slot-scope="scope">
          {{ dateConvert(scope.row.validity) }}
        </template>
      </el-table-column>
    </template>

    <template slot="edit-popup">
      <el-form-item label="Код" prop="code">
        <el-input v-model="formData.code">
          <i slot="prefix" class="el-input__icon el-icon-edit"></i>
        </el-input>
      </el-form-item>

      <el-form-item label="Скидка" prop="discount">
        <el-input v-model="formData.discount">
          <i slot="prefix" class="el-input__icon el-icon-edit"></i>
        </el-input>
      </el-form-item>

      <el-form-item label="Срок действия(до)" prop="validity">
        <el-date-picker
          size="w-100"
          v-model="formData.validity"
          type="date"
          format="dd.MM.yyyy"
          value-format="timestamp"
          placeholder="Срок действия(до)">
        </el-date-picker>
      </el-form-item>
    </template>
  </cms-content>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import { Database } from "@/types";
import {dateConvert} from "~/helpers";

export default Vue.extend({
  name: "cms-promo-codes",
  layout: 'cms',
  async asyncData({ store }) {
    await store.dispatch('database/promo-codes/getAll');
  },
  data() {
    return {
      formData: {
        id: '',
        code: '',
        discount: null as null | number,
        validity: null as null | number
      },
      rules: {
        code: [
          { required: true, message: 'Выберите код', trigger: 'blur' }
        ],
        discount: [
          { required: true, message: 'Выберите скидку', trigger: 'blur' }
        ],
        validity: [
          { required: true, message: 'Выберите срок действия', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    dateConvert,
    async addPromoCode() {
      return await this.$store.dispatch('database/promo-codes/add', this.formData);
    },
    async editPromoCode() {
      return await this.$store.dispatch('database/promo-codes/update', this.formData);
    },
    async removePromoCode(id) {
      await this.$store.dispatch('database/promo-codes/remove', id);
    },
    async movePromoCode({ newPos, el }) {
      await this.$store.dispatch('database/promo-codes/move', { newPos, el });
    },
    updateDataEditPopup(promoCode: Database.IPromoCode) {
      if (promoCode) {
        const { id, code, discount, validity } = promoCode;

        this.formData = { id, code, discount, validity }
      }
      else {
        this.formData = {
          id: '',
          code: '',
          discount: null,
          validity: null
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      promoCodes: 'database/promo-codes/getAll'
    })
  }
})
</script>
