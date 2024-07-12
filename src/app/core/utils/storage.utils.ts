import { CryptoUtils } from './crypto.utils';

export class StorageUtils {
  static add(key: string, item: any) {
    localStorage.setItem(key, CryptoUtils.encrypt(JSON.stringify(item)));
  }

  static remove(key: string) {
    localStorage.removeItem(key);
  }

  static removeAll() {
    localStorage.clear();
  }

  static find(key: string) {
    const item = localStorage.getItem(key);

    if (item) {
      return JSON.parse(CryptoUtils.decrypt(item));
    }

    return null;
  }
}
