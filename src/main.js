import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import animate from "animate.css";
import navigation from "vue-navigation";
import VueRouter from "vue-router";

import Vant from "vant";
import "vant/lib/index.css";

import ElementUI from "element-ui";
import "./style/element-variables.scss";
import locale from "element-ui/lib/locale/lang/zh-TW";

// 覆蓋 VueRouter 的 push,replace 方法來全局處理導航錯誤
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch((err) => err);
};

Vue.use(Vant);
Vue.use(animate);
Vue.use(navigation, { router });
Vue.use(ElementUI, { locale });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
