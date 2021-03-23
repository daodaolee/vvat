import { UserState } from "./types";
const state: UserState = {
  username: "123",
  password: "456",
  mobile: "",
  status: 0,
};
const mutations = {};
const actions = {};
const getters = {
  count(state: UserState) {
    return state;
  },
};
export default { state, mutations, actions, getters };
