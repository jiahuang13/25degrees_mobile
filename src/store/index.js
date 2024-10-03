import Vue from "vue";
import Vuex from "vuex";
import cart from "@/store/cart";
import search from "@/store/search";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    cart,
    search,
  },
});
