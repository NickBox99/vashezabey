<template>
  <div class="profile">
    <div class="profile__wrapper">
      <div class="profile__header">
        <info-circle class="profile__info-circle" type="small">{{ initials }}</info-circle>

        <div class="profile__info">
          <div class="profile__name">{{ formData.name }}</div>
          <div class="profile__date">Дата регистрации: {{ dateConvert(user.registered) }}</div>
        </div>
      </div>

      <el-form class="login__fields" ref="form"
               :rules="rules"
               :model="formData"
      >
        <div class="profile__title">Номер телефона</div>
        <el-input
          v-mask-phone
          class="profile__input dark"
          placeholder="Не указан"
          :key="user.phone"
          :value="user.phone"
          disabled
        >
          <i slot="prefix" class="el-input__icon el-icon-phone-outline"></i>
        </el-input>

        <div class="profile__title">Имя</div>
        <el-form-item prop="name">
          <el-input
            class="dark"
            placeholder="Имя"
            v-model="formData.name"
          >
            <i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
          </el-input>
        </el-form-item>

        <div class="profile__title">Дата рождения</div>
        <el-date-picker
          class="profile__input dark"
          size="w-100"
          v-model="user.birthday"
          type="date"
          format="dd.MM.yyyy"
          disabled
          placeholder="Не указана">
        </el-date-picker>
      </el-form>

      <el-button type="secondary" @click="onSubmit" size="w-100">Cохранить изменения</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import { dateConvert, getResultFormValidate } from "@/helpers";
import { ElementUI } from "~/types";

export default Vue.extend({
  name: "profile",
  data() {
    return {
      formData: {
        name: ''
      },

      rules: {
        name: [
          { required: true, message: 'Введите имя', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.formData.name = this.user.name;
  },
  methods: {
    dateConvert,
    async onSubmit() {
      if (!getResultFormValidate(this.$refs.form as unknown as ElementUI.Form.IValidate)) {
        return;
      }

      const isUpdated: boolean = await this.$store.dispatch('database/users/update', { id: this.user.id , name: this.formData.name });

      if (isUpdated) {
        this.$notify({
          title: 'Успешно',
          message: 'Данные сохранены',
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
    initials(): string {
      const [first, second] = this.formData.name.split(' ');
      return `${first? first[0] : ""} ${second? second[0] : ''}`.toUpperCase();
    },
    ...mapGetters({
      user: 'auth/getUser'
    })
  }
})
</script>

<style scoped lang="scss">
.profile {
  display: flex;
  justify-content: center;
  height: 100%;

  @media screen and (min-width: 640px) {
    align-items: center;
  }

  &__wrapper {
    max-width: 300px;
    width: 100%;
  }

  &__header {
    display: flex;
    align-items: center;
    margin-bottom: 24px;
  }

  &__info-circle {
    margin-right: 16px;
    letter-spacing: -1px;
  }

  &__date, &__title {
    color: var(--color-white-opac60);
  }

  &__name {
    font-size: 14px;
  }

  &__title {
    margin-bottom: 12px;
  }

  &__input {
    margin-bottom: 8px;
    &:not(:last-of-type) {
      margin-bottom: 16px;
    }

    &:last-of-type {
      margin-bottom: 24px;
    }
  }
}
</style>
