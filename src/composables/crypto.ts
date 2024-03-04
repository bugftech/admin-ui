// @ts-ignore
import * as CryptoJS from 'crypto-js';
const passwordKey = import.meta.env.VITE_PASSWORD_CRYPTO_KEY;

// encrypt 加密文本
export function encrypt(text: string) {
  return CryptoJS.AES.encrypt(text, passwordKey).toString();
}

// decrypt 解析文本
export function decrypt(text: string) {
  const bytes = CryptoJS.AES.decrypt(text, passwordKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}
