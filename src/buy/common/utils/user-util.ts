const JSEncrypt = require('node-jsencrypt');
const key =
  "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCI0EI80jr31IxcxZbz3e+s5kfgbCpusjErMCVQ8R8TnLSr2svoP6XkKujqK80Fl5uVTsXzA43APcqdUZad2pRHWzcyIP03cymHu3TO5AbklAs/aWMgZr64geP9SpGpgOEafHtYZLWAjzhqDCu4KiFy1J170tG3SQ7LF0QThasPLwIDAQAB";

export function rsaPassWord(password: string) {
  if (!password) {
    return "";
  }
  let encryptor = new JSEncrypt();
  encryptor.setPublicKey(key);
  let rsaPassWord = encryptor.encrypt(password);
  return rsaPassWord;
};
