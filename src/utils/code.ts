/* 随机生成验证码
* @params len：长度，默认是4
*/
export function randomString(len: number = 4) {
  //chars中去除了容易混淆的字母或数字，例如O和0
  var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  var maxPos = chars.length;
  var pwd = '';
  for (let i = 0; i < len; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}
// export default {
//   randomCode: randomString
// }