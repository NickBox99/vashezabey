import axios from "axios";

class Smsc {
  #apiSend = 'https://smsc.ru/sys/send.php?fmt=3&';
  #apiInfo = 'https://smsc.ru/sys/info.php?fmt=3&get_operator=1&charset=utf-8&';

  constructor(public login: string, public password: string) {
    const access = `login=${login}&psw=${password}`;
    this.#apiSend += access;
    this.#apiInfo += access;
  }

  private getNewCode() {
    return Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  }

  async call(phone: string) {
    const response = await axios.get(`${this.#apiSend}&phones=${phone}&mes=code&call=1`).then(e => e.data).catch(e => false);

    return !response.error? {
      message: 'Мы вам позвоним, введите последние 6 цифр звонка',
      code: +response.code
    } : false;
  }

  async sendSms(phone: string) {
    const code = this.getNewCode();

    const response = await axios.get(`${this.#apiSend}&phones=${phone}&mes=Ващезабей: ваш код: ${code}`).then(e => e.data).catch(e => false);

    return !response.error? {
      message: 'Мы отправили смс, введите код из смс',
      code
    } : false;
  }

  async sendCode(phone: string) {
    let response = await this.call(phone);

    if (!response) {
      response = await this.sendSms(phone);
    }

    return response?? false;
  }

  async getInfoPhone(phone: string) {
    //@ts-ignore
    const response = await axios.get(`${this.#apiInfo}&phone=${phone}`).then(e => e.data).catch(() => false);

    return !response.error? response : false;
  }
}

export { Smsc };
