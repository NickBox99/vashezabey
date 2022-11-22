<template>
<div class="qr-codes">

  <el-input class="qr-codes__field" placeholder="№ стола" v-model="table">
    <el-select v-model="placeId" slot="prepend" placeholder="Заведение">
      <el-option
        v-for="item in places"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </el-input>

  <qrcode-vue class="qr-codes__code" :value="urlQRCode" :size="300" level="M" ref="qrCode" />

  <el-button class="qr-codes__btn" type="secondary" @click="onDownload">Скачать</el-button>
</div>
</template>

<script lang="ts">
import Vue from "vue";
import QrcodeVue from 'qrcode.vue/dist/qrcode.vue'
import { Database, ElementUI } from "~/types";

export default Vue.extend({
  name: "qr-codes",
  layout: "cms",
  components:  {
    QrcodeVue
  },
  async asyncData({ store }) {
    const places = (await store.dispatch('database/places/getAll')).map(({ id, name }: Database.IPlace) => ({ label: name, value: id }));

    return { places }
  },
  data() {
    return {
      places: [] as ElementUI.ISelect[],
      placeId: null as null | string,
      table: null as null | number,
      baseUrl: ''
    }
  },
  mounted() {
    this.baseUrl = window.location.origin;
  },
  methods: {
    async onDownload() {
      const image = (this.$refs.qrCode as unknown as { $refs: { 'qrcode-vue': HTMLCanvasElement } }).$refs['qrcode-vue'].toDataURL();

      const tmpLink = document.createElement( 'a' );
      tmpLink.download = `QrCode Стол - ${this.table}.png`;
      tmpLink.href = image;

      document.body.appendChild( tmpLink );
      tmpLink.click();
      document.body.removeChild( tmpLink );
    },
  },
  computed: {
    urlQRCode(): string {
      return `${this.baseUrl}/?=table=${this.table}&place=${this.placeId}`
    }
  }
})
</script>

<style scoped lang="scss">
.qr-codes {
  &__field {
    margin-bottom: 20px;

    &::v-deep(.el-input__inner) {
      width: 300px;
    }

    &::v-deep(.el-select) {
      .el-input__inner, .el-input {
        width: 150px;
      }
    }
  }

  &__code {
    margin-bottom: 20px;
  }

  &__btn {
    width: 300px;
  }
}
</style>
