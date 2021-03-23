import { createStore } from "vuex";
import user from "./user";
import menu from "./menu";

const store = createStore({
  modules: {
    user,
    menu
  }
})
export default store;
