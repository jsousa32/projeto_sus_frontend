import * as CryptoJS from 'crypto-js';
import { environment } from '../../../environments/environment';

export class CryptoUtils {
  static encrypt(data: string) {
    return CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(environment.secretKey), {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    }).toString();
  }

  static decrypt(data: string) {
    const bytes = CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(environment.secretKey), {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });

    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
