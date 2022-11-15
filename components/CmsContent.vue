<template>
  <div class="cms-content">
    <div class="cms-content__header">
      <h2 class="cms-content__title">
        {{ titlePage }}
        <span class="cms-content__count">[{{ data.length }}]</span>
      </h2>

      <el-input
        v-model="search"
        size="small"
        class="el-input_light cms-content__search"
        placeholder="Поиск"/>

      <el-button type="success" size="small" @click="onOpenEditPopup(null)" v-if="!disableAdd">Добавить</el-button>
    </div>

    <el-table border height="100%" :data="arrayElements">
      <el-table-column label="№" width="50">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>

      <slot name="table"/>

      <cms-table-buttons
        @edit="onOpenEditPopup"
        @remove="onRemove"
        @move="onOpenMovePopup"
        :disable-remove="disableRemove"
      />
    </el-table>

    <el-dialog
      width="500px"
      top=""
      :title="titleEditPopup"
      :visible.sync="isShowEditPopup"
    >
      <el-form
        ref="form"
        :rules="rulesEditPopup"
        :model="modelEditPopup"
      >
        <slot name="edit-popup"/>
      </el-form>

      <cms-table-popup-buttons slot="footer" @save="onSubmit" />
    </el-dialog>

    <cms-table-move-popup v-model="isShowMovePopup" @submit="onMove"/>

    <slot/>
  </div>
</template>

<script lang="ts">
import Vue, {PropType} from "vue";

export default Vue.extend({
  name: "CmsContent",
  props: {
    titlePage: {
      type: String,
      default: ""
    },
    titleEditPopup: {
      type: String,
      default: ""
    },
    rulesEditPopup: {
      type: Array,
      required: true
    },
    modelEditPopup: {
      type: Object,
      required: true
    },
    data: {
      type: Array,
      required: true
    },
    disableAdd: {
      type: Boolean
    },
    disableRemove: {
      type: Boolean
    },
    add: {
      type: Function as PropType<() => void>,
      required: true
    },
    edit: {
      type: Function as PropType<() => void>,
      required: true
    },
    remove: {
      type: Function as PropType<(id: string) => void>,
      required: true
    },
    move: {
      type: Function as PropType<(obj: { newPos: number, el }) => void>,
      required: true
    },
    searchQuery: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isShowEditPopup: false,
      isShowMovePopup: false,
      moveElement: null,
      search: ''
    }
  },
  methods: {
    onOpenEditPopup(obj) {
      this.isShowEditPopup = true;
      this.$emit('edit-popup-open', obj);
    },
    onOpenMovePopup(el) {
      this.moveElement = el;
      this.isShowMovePopup = true;
    },
    async onSubmit() {
      let isValid = false;
      //@ts-ignore
      this.$refs.form.validate((valid: boolean) => isValid = valid);
      if(!isValid) {
        return;
      }

      if (this.modelEditPopup.id) {
        this.edit();
      }
      else {
        this.add();
      }

      this.$notify({
        title: 'Успешно',
        message: 'Данные отправлены',
        type: 'success'
      });

      this.isShowEditPopup = false;
    },
    async onRemove(id) {
      this.remove(id);

      this.$notify({
        title: 'Успешно',
        message: 'Данные отправлены',
        type: 'success'
      });
    },
    async onMove(newPos) {
     this.move({ newPos, el: this.moveElement });

      this.$notify({
        title: 'Успешно',
        message: 'Пермещение выполнено',
        type: 'success'
      });
    }
  },
  computed: {
    arrayElements(): any[] {
      const searchLower = this.search.toLowerCase();//@ts-ignore
      return this.data.filter(el => this.searchQuery.find(key => String(el[key]).toLowerCase().includes(searchLower)))
    }
  }
})
</script>

<style lang="scss" scoped>
.cms-content {
  height: calc(100% - 40px);

  &__header {
    display:flex;
    align-items: center;
    margin-bottom: 10px;
  }

  &__title {
    font-size: 20px;
  }

  &__count {
    color: var(--color-white-opac50);
  }

  &__search {
    margin: 0 10px 0 auto;
    width: 300px;
  }
}

</style>
