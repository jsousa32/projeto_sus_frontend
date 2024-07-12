import * as CryptoJS from 'crypto-js';
import { environment } from '../../../environments/environment';

export class CryptoUtils {
  static encrypt(data: string) {
    return CryptoJS.AES.encrypt(data, environment.secretKey).toString();
  }

  static decrypt(data: string) {
    const bytes = CryptoJS.AES.decrypt(data, environment.secretKey);

    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
