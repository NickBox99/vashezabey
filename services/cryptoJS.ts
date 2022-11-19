const crypto = require("crypto-js");

class CryptoJS {
  constructor(private key: string) {}

  encrypt(word: string): string {
    return crypto.AES.encrypt(word, this.key).toString();
  }

  decrypt(word: string): string {
    return crypto.AES.decrypt(word, this.key).toString(crypto.enc.Utf8);
  }
}

export { CryptoJS };
