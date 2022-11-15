<template>
  <cms-content
    title-page="Программа лояльности"
    title-edit-popup="Форма программы лояльности"
    :data="discountRules"
    :rules-edit-popup="rules"
    :model-edit-popup="formData"
    @edit-popup-open="updateDataEditPopup"
    :add="addDiscountRule"
    :edit="editDiscountRule"
    :remove="removeDiscountRule"
    :move="moveDiscountRule"
    :search-query="['percent', 'summa']"
  >
    <template slot="table">
      <el-table-column prop="summa" label="Действует от" min-width="180">
        <template slot-scope="scope">
          {{ numberConvert(scope.row.summa) }} руб
        </template>
      </el-table-column>

      <el-table-column prop="percent" label="Скидка" min-width="180">
        <template slot-scope="scope">
          {{ scope.row.percent }}%
        </template>
      </el-table-column>
    </template>

    <template slot="edit-popup">
      <el-form-item label="Сумма" prop="summa">
        <el-input v-model="formData.summa">
          <i slot="prefix" class="el-input__icon el-icon-edit"></i>
        </el-input>
      </el-form-item>

      <el-form-item label="Скидка" prop="percent">
        <el-input v-model="formData.percent">
          <i slot="prefix" class="el-input__icon el-icon-edit"></i>
        </el-input>
      </el-form-item>
    </template>
  </cms-content>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import { Database } from "@/types";
import { numberConvert } from "~/helpers";

export default Vue.extend({
  name: "cms-discount-rules",
  layout: 'cms',
  async asyncData({ store }) {
    await store.dispatch('database/discount-rules/getAll');
  },
  data() {
    return {
      formData: {
        id: '',
        percent: null as null | number,
        summa: null as null | number,
        placeId: ''
      },
      rules: {
        percent: [
          { required: true, message: 'Выберите процент', trigger: 'blur' }
        ],
        summa: [
          { required: true, message: 'Выберите сумму', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    numberConvert,
    async addDiscountRule() {
      return await this.$store.dispatch('database/discount-rules/add', this.formData);
    },
    async editDiscountRule() {
      return await this.$store.dispatch('database/discount-rules/update', this.formData);
    },
    async removeDiscountRule(id) {
      await this.$store.dispatch('database/discount-rules/remove', id);
    },
    async moveDiscountRule({ newPos, el }) {
      await this.$store.dispatch('database/discount-rules/move', { newPos, el });
    },
    updateDataEditPopup(discountRule: Database.IDiscountRule) {
      if (discountRule) {
        const { id, summa, percent, placeId } = discountRule;

        this.formData = { id, summa, percent, placeId}
      }
      else {
        this.formData = {
          id: '',
          percent: null,
          summa: null,
          placeId: this.placeId
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      discountRules: 'database/discount-rules/getAll',
      placeId: 'settings/getId'
    })
  }
})
</script>
