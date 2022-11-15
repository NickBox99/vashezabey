<template>
  <el-table-column fixed="right" width="100">
    <template slot-scope="scope">
      <div class="table-buttons">
        <i class="el-icon-download table-buttons__btn table-buttons__btn_move" @click="move(scope.row)"></i>
        <i class="el-icon-edit table-buttons__btn table-buttons__btn_edit" @click="edit(scope.row)"></i>
        <el-popconfirm
          confirm-button-text='Да'
          cancel-button-text='Нет'
          icon="el-icon-info"
          icon-color="red"
          title="Подтверждение"
          @confirm="remove(scope.row.id)"
        > <i slot="reference" class="el-icon-delete table-buttons__btn table-buttons__btn_remove" v-if="!disableRemove"></i>
        </el-popconfirm>
      </div>
    </template>
  </el-table-column>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "CmsTableButtons",
  props: {
    disableRemove: {
      type: Boolean
    }
  },
  methods: {
    move(el) {
      this.$emit('move', el);
    },
    edit(obj) {
      this.$emit('edit', obj);
    },
    remove(id) {
      this.$emit('remove', id);
    }
  }
})
</script>

<style scoped lang="scss">
.table-buttons {
  display: flex;
  justify-content: flex-end;

  &__btn {
    padding: 6px;
    font-size: 15px;
    cursor: pointer;

    &_edit, &_move {
      &:hover {
        color: var(--color-purple);
      }
    }

    &_remove:hover {
      color: var(--color-red);
    }
  }
}
</style>
