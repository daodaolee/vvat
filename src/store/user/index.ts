import { UserState } from "./types";
const state: UserState = {
  username: "",
  password: "",
  code: "",
  status: 0,
};
const mutations = {
  // 存储用户信息
  setUserInfo(state: UserState, info: UserState) {
    localStorage.setItem("userInfo", JSON.stringify(info));
    state = { ...info };
  },
  // 清除用户信息
  clearUserInfo(state: UserState) {
    if (state) {
      localStorage.removeItem("userInfo");
      state = {
        username: "",
        password: "",
        code: "",
        status: 0,
      };
    }
  },
};
const actions = {
  setUserInfo(store: any, info: Object) {
    store.commit("setUserInfo", info);
  },
  clearUserInfo(store: any) {
    store.commit("clearUserInfo");
  },
};
const getters = {
  userInfo(state: UserState) {
    const user = localStorage.getItem("userInfo");
    return user && user !== "{}" ? JSON.parse(user) : {};
  },
};
export default { state, mutations, actions, getters };
