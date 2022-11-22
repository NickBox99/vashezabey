<template>
  <cms-content
    title-page="Акции"
    title-edit-popup="Форма акции"
    :data="stocks"
    :rules-edit-popup="rules"
    :model-edit-popup="formData"
    @edit-popup-open="updateDataEditPopup"
    :add="addStock"
    :edit="editStock"
    :remove="removeStock"
    :move="moveStock"
    :search-query="['name', 'description']"
  >

    <template slot="table">
      <el-table-column prop="name" label="Название" min-width="180"/>
      <el-table-column prop="description" label="Описание" min-width="180"/>
      <el-table-column prop="validity" label="Срок действия" min-width="180">
        <template slot-scope="scope">
          {{ dateConvert(scope.row.validity) }}
        </template>
      </el-table-column>
    </template>

    <template slot="edit-popup">
      <el-form-item label="Название" prop="name">
        <el-input v-model="formData.name" >
          <i slot="prefix" class="el-input__icon el-icon-edit"></i>
        </el-input>
      </el-form-item>

      <el-form-item label="Описание" prop="description">
        <el-input
          v-model="formData.description"
          type="textarea"
          :rows="2"
        >
          <i slot="prefix" class="el-input__icon el-icon-edit"></i>
        </el-input>
      </el-form-item>

      <el-upload
        ref="uploadPreview"
        drag
        action="#"
        :http-request="uploadPreview"
        :file-list="fileListPreview"
        list-type="picture-card"
      >
        <el-icon name="upload"></el-icon>
        <div slot="file" slot-scope="{file}">
          <img :src="file.url" alt="" class="el-preview"/>
          <div class="el-upload-list__item-actions">
            <span
              class="el-upload-list__item-preview"
              @click="openPreviewPopup(file)"
            >
              <i class="el-icon-zoom-in"></i>
            </span>
          </div>
        </div>
      </el-upload>

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

    <template slot="default">
      <el-dialog :visible.sync="isShowPreviewPopup" top="">
        <img :src="previewUrl" alt="Preview Image" class="el-preview" />
      </el-dialog>
    </template>

  </cms-content>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import { Database, ElementUI } from "@/types";
import { dateConvert } from "~/helpers";

export default Vue.extend({
  name: "cms-stocks",
  layout: 'cms',
  async asyncData({ store }) {
    await store.dispatch('database/stocks/getAll');
  },
  data() {
    return {
      formData: {
        id: '',
        name: '',
        description: '',
        imageId: '',
        imageUrl: '',
        validity: null as null | number
      } as Database.IStock,
      previewFile: null as null | File | string,
      previewUrl: '',
      fileListPreview: [] as { name: string, url: string }[],
      isShowPreviewPopup: false,

      rules: {
        name: [
          { required: true, message: 'Выберите название', trigger: 'blur' }
        ],
        description: [
          { required: true, message: 'Выберите описание', trigger: 'blur' }
        ],
        validity: [
          { required: true, message: 'Выберите срок действия', trigger: 'blur' }
        ]
      } as ElementUI.Form.IRules
    }
  },
  methods: {
    dateConvert,

    uploadPreview({ file } : { file: File }) {
      this.previewFile = file;

      const uploadPreview = (this.$refs.uploadPreview as unknown as ElementUI.IUpload);

      if (uploadPreview.uploadFiles.length > 1) {
        uploadPreview.uploadFiles.shift();
      }
    },
    openPreviewPopup(file) {
      this.previewUrl = file.url;
      this.isShowPreviewPopup = true
    },

    async addStock(): Promise<boolean> {
      return this.$store.dispatch('database/stocks/add', {...this.formData, imageUrl: this.previewFile });
    },
    async editStock(): Promise<boolean> {
      return this.$store.dispatch('database/stocks/update', {...this.formData, imageUrl: this.previewFile });
    },
    async removeStock(id): Promise<boolean> {
      return this.$store.dispatch('database/stocks/remove', id);
    },
    async moveStock({ newPos, el }): Promise<boolean> {
      return this.$store.dispatch('database/stocks/move', { newPos, el });
    },

    updateDataEditPopup(stock: Database.IStock) {
      if (stock) {
        const { imageId, imageUrl } = stock;
        this.formData = { ...stock };

        this.previewFile = imageUrl;
        this.fileListPreview = [{ name: imageId, url: imageUrl }];
      }
      else {
        this.formData = {
          id: '',
          pos: 0,
          name: '',
          description: '',
          imageId: '',
          imageUrl: '',
          validity: null!
        }

        this.previewFile = null;
        if (this.$refs.uploadPreview) {
          (this.$refs.uploadPreview as unknown as ElementUI.IUpload).clearFiles();
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      stocks: 'database/stocks/getAll'
    })
  }
})
</script>
