<template>
  <cms-content
    title-page="Пользователи"
    title-edit-popup="Форма пользователя"
    :data="rulesArray"
    :rules-edit-popup="rules"
    :model-edit-popup="formData"
    @edit-popup-open="updateDataEditPopup"
    :add="addUser"
    :edit="editUser"
    :remove="removeUser"
    :move="moveUser"
    :search-query="['name', 'phone', 'cardId']"
  >
    <template slot="table">
      <el-table-column prop="cardId" label="id карты" width="90"/>
      <el-table-column prop="name" label="Имя" min-width="100"/>
      <el-table-column prop="phone" label="Телефон" width="120"/>

      <el-table-column prop="accumulated" label="Накоплено" width="112">
        <template slot-scope="scope">
          {{ numberConvert(scope.row.accumulated) }} руб
        </template>
      </el-table-column>

      <el-table-column prop="fixDiscount" label="Текущ. скидка" width="122">
        <template slot-scope="scope">
          {{ calcPersonDiscount(discountRules, { fixDiscount: scope.row.fixDiscount, accumulated: scope.row.accumulated }).nowDiscount }} %
        </template>
      </el-table-column>

      <el-table-column prop="fixDiscount" label="Фикс. скидка" width="116">
        <template slot-scope="scope">
          {{ scope.row.fixDiscount? `${scope.row.fixDiscount}%` : '' }}
        </template>
      </el-table-column>

      <el-table-column prop="birthday" label="Дата рождения" width="130">
        <template slot-scope="scope">
          {{ dateConvert(scope.row.birthday) }}
        </template>
      </el-table-column>

      <el-table-column prop="registered" label="Дата регистрации" width="148">
        <template slot-scope="scope">
          {{ dateConvert(scope.row.registered) }}
        </template>
      </el-table-column>

      <el-table-column prop="accumulateUpdated" label="Последнее обновление счета" width="228">
        <template slot-scope="scope">
          {{ dateConvert(scope.row.accumulateUpdated) }}
        </template>
      </el-table-column>

      <el-table-column prop="operator" label="Оператор" width="94"/>
      <el-table-column prop="region" label="Регион" width="180"/>
      <el-table-column prop="country" label="Страна" width="80"/>

      <el-table-column prop="role" label="Доступ" width="142">
        <template slot-scope="scope">
          {{ userRoles.get(scope.row.role) }}
        </template>
      </el-table-column>
    </template>

    <template slot="edit-popup">

      <el-form-item label="Имя" prop="name">
        <el-input
          v-model.number="formData.name">
          <i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
        </el-input>
      </el-form-item>

      <el-form-item label="Телефон" prop="phone">
        <el-input
          v-model="formData.phone"
          v-mask-phone
          :key="formData.id"
          :disabled="!!formData.id"
        >
          <i slot="prefix" class="el-input__icon el-icon-phone-outline"></i>
        </el-input>
      </el-form-item>

      <el-form-item label="Дата рождения" prop="birthday">
        <el-date-picker
          size="w-100"
          class="login__field"
          v-model="formData.birthday"
          type="date"
          format="dd.MM.yyyy"
          value-format="timestamp"
          placeholder="Дата рождения">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="Фикс. скидка">
        <el-input
          v-model.number="formData.fixDiscount">
          <i slot="prefix" class="el-input__icon el-icon-star-off"></i>
        </el-input>
      </el-form-item>

      <el-form-item label="Доступ">
        <el-select
          v-model="formData.role"
          filterable
          size="w-100"
        >
          <i slot="prefix" class="el-input__icon el-icon-s-platform"></i>
          <el-option
            v-for="key in userRoles.keys()"
            :key="key"
            :label="userRoles.get(key)"
            :value="key"
            :disabled="key < user.role"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Id карты">
        <el-input
          v-model.number="formData.cardId">
          <i slot="prefix" class="el-input__icon el-icon-star-off"></i>
        </el-input>
      </el-form-item>
    </template>
  </cms-content>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import { Database } from "@/types";
import {numberConvert, dateConvert, calcPersonDiscount, phoneConvert} from "@/helpers";
import { UserRoleDescription as userRoles } from "@/config"

export default Vue.extend({
  name: "cms-users",
  layout: 'cms',
  async asyncData({ store }) {
    await store.dispatch('database/users/getAll');
    const discountRules = await store.dispatch('database/discount-rules/getAll');

    return { discountRules }
  },
  data() {
    return {
      discountRules: [],

      formData: {
        id: '',
        name: '',
        phone: '',
        birthday: 0,
        role: Database.IUserRole.user,
        cardId: '',
        fixDiscount: ''
      },
      rules: {
        name: [
          { required: true, message: 'Выберите имя', trigger: 'blur' }
        ],

        phone: [
          { required: true, message: 'Введите телефон', trigger: 'blur' }
        ],

        birthday: [
          { required: true, message: 'Введите дату рождения', trigger: 'blur' }
        ]
      },

      userRoles
    }
  },
  methods: {
    calcPersonDiscount,
    numberConvert,
    dateConvert,
    async addUser() {
      const newUser = {
        ...this.formData,
        phone: phoneConvert(this.formData.phone)
      }

      return await this.$store.dispatch('database/users/add', newUser);
    },
    async editUser() {
      return await this.$store.dispatch('database/users/update', this.formData);
    },
    async removeUser(id) {
      await this.$store.dispatch('database/users/remove', id);
    },
    async moveUser({ newPos, el }) {
      await this.$store.dispatch('database/users/move', { newPos, el });
    },
    updateDataEditPopup(user: Database.IUser) {
      if (user) {
        const { id, name, phone, birthday, role, cardId, fixDiscount } = user;

        this.formData = {
          id,
          name,
          phone,
          birthday,
          role,
          cardId,
          fixDiscount
        }
      }
      else {
        this.formData = {
          id: '',
          name: '',
          phone: '',
          birthday: 0,
          role: Database.IUserRole.user,
          cardId: '',
          fixDiscount: ''
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      rulesArray: 'database/users/getAll',
      user: 'auth/getUser'
    })
  }
})
</script>
