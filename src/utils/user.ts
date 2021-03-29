/** 是否登录状态
 * @returns boolean
 */
export function isLoginState(): boolean {
  let bool;
  const localUserStr = localStorage.getItem("userInfo");
  if (localUserStr && localUserStr !== "{}") {
    const localUser = JSON.parse(localUserStr);
    if (localUser.token) {
      bool = true;
    } else {
      bool = false;
    }
  } else {
    bool = false;
  }
  return bool;
}
export function userInfo(): object {
  let user: object;
  const localUser = localStorage.getItem("userInfo");
  if (localUser && localUser !== "{}") {
    user = JSON.parse(localUser);
  } else {
    user = {};
  }
  return user;
}
