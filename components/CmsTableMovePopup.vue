<template>
  <el-dialog width="410px" top="" title="Изменение позиции" :visible="value === true" @close="close" ref="form">

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

export default Vue.extend({
  name: "CmsTableMovePopup",
  props: {
    value: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      formData: {
        position: ''
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
      let isValid = false;
      //@ts-ignore
      this.$refs.form.validate((valid: boolean) => isValid = valid);
      if(!isValid) {
        return;
      }

      this.$emit('submit', +this.formData.position - 1);
      this.close();
    },
    close() {
      this.formData.position = '';
      this.$emit('input', false);
    }
  }
})
</script>
