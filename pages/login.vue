<template>
  <div class="login">
    <div class="login__wrapper">
      <img src="~/assets/img/logo.webp" class="login__logo" width="290" height="106" alt="Ваще забей">
      <div class="login__description">{{ settings.description }}</div>
      <el-form class="login__fields" ref="form"
               :rules="rules"
               :model="formData"
      >
        <el-form-item prop="phone">
          <el-input
            v-mask-phone
            class="login__field dark"
            placeholder="Номер телефона"
            v-model="formData.phone">
            <i slot="prefix" class="el-input__icon el-icon-phone-outline"></i>
          </el-input>
        </el-form-item>

        <template v-if="!isLoginPage">
          <el-form-item prop="name">
            <el-input
              class="login__field dark"
              placeholder="Имя"
              v-model="formData.name">
              <i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
            </el-input>
          </el-form-item>

          <el-form-item prop="birthday">
            <el-date-picker
              class="login__field dark"
              v-model="formData.birthday"
              type="date"
              size="w-100"
              format="dd.MM.yyyy"
              value-format="timestamp"
              placeholder="Дата рождения">
            </el-date-picker>
          </el-form-item>
        </template>
      </el-form>

      <el-button type="secondary" size="w-100" class="login__button" @click="sendCode">{{ settings.buttonText }}</el-button>
      <div class="login__redirect">{{ settings.redirect[0] }} <span class="login__redirect-link" @click="toggleTypePage">{{ settings.redirect[1] }}</span></div>
    </div>


    <el-dialog width="300px" top=""
      :title="popupTitle"
      :visible.sync="isShowPopup"
    >
      <el-input
        placeholder="1234"
        v-model.number="currentCode">
        <i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
      </el-input>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onSubmit" size="w-100">Применить</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {mapGetters} from "vuex";

export default Vue.extend({
  name: "login",
  data() {
    const validatePhone = (rule: string, value: string, callback: (error?: Error) => void) => {
      if (value.length < 18) {
        callback(new Error('Введите номер телефона'));
      }
      else {
        callback();
      }
    };

    return {
      isLoginPage: true,
      isShowPopup: false,
      popupTitle: '',

      currentCode: '' as number | string,
      sentCode: '' as number | string,

      formData: {
        birthday: '',
        phone: '',
        name: ''
      },

      rules: {
        birthday: [
          { required: true, message: 'Выберите дату рождения', trigger: 'blur' }
        ],

        phone: [
          { validator: validatePhone, type: 'number', trigger: 'blur' }
        ],

        name: [
          { required: true, message: 'Введите имя', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async onSubmit() {
      if (this.currentCode !== this.sentCode) {
        this.$notify({
          title: 'Код',
          message: 'Неверный код',
          type: 'error'
        });
        return;
      }

      if (!this.isLoginPage) {
        await this.$store.dispatch('database/users/add', { birthday: this.formData.birthday, phone: this.phoneFormatted, name: this.formData.name });
      }

      await this.$store.dispatch('auth/login', this.phoneFormatted);
      await this.$router.push('/discount');
    },
    async sendCode() {
      let isValid = false;
      //@ts-ignore
      this.$refs.form.validate((valid: boolean) => isValid = valid);
      if(!isValid) {
        return;
      }

      if (this.isLoginPage && !(await this.$store.dispatch('database/users/hasUser', this.phoneFormatted))) {
        this.isLoginPage = false;
        return;
      }

      //@ts-ignore
      const response = await this.$smsc.sendCode(this.phoneFormatted);

      if (response) {
        const { code, message } = response;
        this.popupTitle = message;
        this.sentCode = code;
        this.isShowPopup = true;
        this.currentCode = '';
      }
      else {
        this.$notify({
          title: 'Ошибка сервиса',
          message: 'Мы не смогли отправить код',
          type: 'error'
        });
      }
    },
    toggleTypePage() {
      this.isLoginPage = !this.isLoginPage;
    }
  },
  computed: {
    phoneFormatted(): string {
      return this.formData.phone.replace(/[^0-9]/gi ,'');
    },
    settings(): { description: string, buttonText: string, redirect: string[] } {
      return this.isLoginPage ? {
        description: 'Авторизуйтесь на сайте, чтобы получить скидку',
        buttonText: 'Войти',
        redirect: ['Нет аккаунта?', 'Зарегистрируйтесь']
      } : {
        description: 'Зарегистрируйтесь на сайте, чтобы получить скидку',
        buttonText: 'Зарегистрироваться',
        redirect: ['Есть аккаунт?', 'Авторизуйтесь']
      };
    },
    ...mapGetters({
      isAuth: 'auth/isAuth'
    })
  }
})
</script>

<style scoped lang="scss">
.login {
  display: flex;
  justify-content: center;
  height: 100%;

  @media screen and (min-width: 640px) {
    align-items: center;
  }

  &__wrapper {
    max-width: 300px;
  }

  &__logo {
    margin-bottom: 6px;
  }

  &__description {
    margin: 0 auto 24px;
    width: 79%;
    font-size: 14px;
    color: var(--color-white-opac70);
    text-align: center;
    line-height: 21px;
  }

  &__field {
    &s {
      margin-bottom: 24px;
    }
  }

  &__button {
    margin-bottom: 24px;
  }

  &__redirect {
    text-align: center;

    &-link {
      color: var(--color-text-brand);
      cursor: pointer;
    }
  }

  //&__code {
  //  margin-bottom: 15px;
  //}
}
</style>
