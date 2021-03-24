/** 是否登录状态
 * @returns boolean 
 */
export function isLoginState(): boolean{
  let bool;
  const localUser = localStorage.getItem("userInfo");
  if(localUser && localUser !== "{}"){
    bool = true;
  }else {
    bool = false;
  }
  return bool;
}