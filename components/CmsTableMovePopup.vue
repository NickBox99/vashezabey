<template>
  <el-dialog width="410px" top="" title="Изменение позиции" :visible="value" @close="close" ref="form">

    <el-form ref="form" :rules="rules" :model="formData">
      <el-form-item label="Введите позицию на которую хотите переместить" prop="position">
        <el-input
          v-model.number="formData.position"
        >
          <i slot="prefix" class="el-input__icon el-icon-place"></i>
        </el-input>
      </el-form-item>
    </el-form>

    <cms-table-popup-buttons slot="footer" @save="onSubmit"/>
  </el-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import { getResultFormValidate } from "~/helpers";
import { ElementUI } from "~/types";

export default Vue.extend({
  name: "cms-table-move-popup",
  props: {
    value: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      formData: {
        position: null as null | number
      },
      rules: {
        position: [
          { required: true, message: 'Выберите позицию', trigger: 'blur' }
        ]
      },
    }
  },
  methods: {
    onSubmit() {
      if (!getResultFormValidate(this.$refs.form as unknown as ElementUI.Form.IValidate)) {
        return;
      }

      this.$emit('submit', this.formData.position! - 1);
      this.close();
    },
    close() {
      this.formData.position = null;
      this.$emit('input', false);
    }
  }
})
</script>
