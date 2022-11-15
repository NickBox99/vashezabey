<template>
  <cms-content
    title-page="Правила"
    title-edit-popup="Форма правила"
    :data="rulesArray"
    :rules-edit-popup="rules"
    :model-edit-popup="formData"
    @edit-popup-open="updateDataEditPopup"
    :add="addRule"
    :edit="editRule"
    :remove="removeRule"
    :move="moveRule"
    :search-query="['name']"
  >
    <el-table-column slot="table" prop="name" label="Текст правила" min-width="180"/>

    <el-form-item label="Текст правила" prop="name" slot="edit-popup">
      <el-input
        v-model="formData.name"
        type="textarea"
        :rows="2"
      >
        <i slot="prefix" class="el-input__icon el-icon-edit"></i>
      </el-input>
    </el-form-item>
  </cms-content>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import { Database } from "@/types";

export default Vue.extend({
  name: "cms-rules",
  layout: 'cms',
  async asyncData({ store }) {
    await store.dispatch('database/rules/getAll');
  },
  data() {
    return {
      formData: {
        id: '',
        name: ''
      },
      rules: {
        name: [
          { required: true, message: 'Выберите правило', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async addRule() {
      return await this.$store.dispatch('database/rules/add', this.formData);
    },
    async editRule() {
      return await this.$store.dispatch('database/rules/update', this.formData);
    },
    async removeRule(id) {
      await this.$store.dispatch('database/rules/remove', id);
    },
    async moveRule({ newPos, el }) {
      await this.$store.dispatch('database/rules/move', { newPos, el });
    },
    updateDataEditPopup(rule: Database.IRule) {
      if (rule) {
        const { id, name } = rule;

        this.formData = {
          id,
          name
        }
      }
      else {
        this.formData = {
          id: '',
          name: ''
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      rulesArray: 'database/rules/getAll'
    })
  }
})
</script>
