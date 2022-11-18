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

    <el-table border :data="arrayElements" height="calc(100% - 52px)">
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
import Vue, { PropType } from "vue";
import { ElementUI } from "~/types";
import { getResultFormValidate } from "~/helpers";

interface IElement {
  [key: string]: number | string
}

export default Vue.extend({
  name: "cms-content",
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
      type: Array as PropType<ElementUI.Form.IRule[]>,
      default: () => ([])
    },
    modelEditPopup: {
      type: Object as PropType<{ id?: string }>,
      required: true
    },
    data: {
      type: Array as PropType<IElement[]>,
      required: true
    },
    disableAdd: {
      type: Boolean,
      default: false
    },
    disableRemove: {
      type: Boolean,
      default: false
    },
    add: {
      type: Function as PropType<() => boolean>,
      required: true
    },
    edit: {
      type: Function as PropType<() => boolean>,
      required: true
    },
    remove: {
      type: Function as PropType<(id: string) => boolean>,
      required: true
    },
    move: {
      type: Function as PropType<(obj: { newPos: number, el: IElement }) => boolean>,
      required: true
    },
    searchQuery: {
      type: Array as PropType<string[]>,
      required: true
    }
  },
  data() {
    return {
      isShowEditPopup: false,
      isShowMovePopup: false,
      moveElement: null as null | IElement,
      search: ''
    }
  },
  methods: {
    onOpenEditPopup(obj?: {}) {
      this.isShowEditPopup = true;
      this.$emit('edit-popup-open', obj);
    },
    onOpenMovePopup(el: IElement) {
      this.moveElement = el;
      this.isShowMovePopup = true;
    },
    async onSubmit() {
      if(!getResultFormValidate(this.$refs.form as unknown as ElementUI.Form.IValidate)) {
        return;
      }

      this.showMessageResult(this.modelEditPopup.id ? this.edit() : this.add());
      this.isShowEditPopup = false;
    },
    async onRemove(id: string) {
      this.showMessageResult(this.remove(id));
    },
    async onMove(newPos: number) {
      this.showMessageResult(this.move({ newPos, el: this.moveElement! }));
    },
    showMessageResult(isSuccess: boolean) {
      if (isSuccess) {
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
    }
  },
  computed: {
    arrayElements(): any[] {
      const searchLower = this.search.toLowerCase();
      return this.data.filter(el => this.searchQuery.find(key => String(el[key]).toLowerCase().includes(searchLower)));
    }
  }
})
</script>

<style lang="scss" scoped>
.cms-content {
  height: 100%;

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
