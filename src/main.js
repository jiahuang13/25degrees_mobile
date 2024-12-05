import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import animate from "animate.css";
import navigation from "vue-navigation";
import Vant from "vant";
import "vant/lib/index.css";
import ElementUI from "element-ui";
import "./style/element-variables.scss";
import locale from "element-ui/lib/locale/lang/zh-TW";

// 引入 vue-echarts 和舊版 echarts
import ECharts from "vue-echarts";

// 引入 echarts 4.x 模組
import "echarts/lib/chart/line"; // 引入折線圖
import "echarts/lib/chart/bar"; // 引入柱狀圖
import "echarts/lib/chart/pie"; // 必須引入 pie 圖表模組來解決當前錯誤
import "echarts/lib/component/tooltip"; // 引入提示框
import "echarts/lib/component/title"; // 引入標題
import "echarts/lib/component/grid"; // 引入 grid

// 註冊全局組件
Vue.component("v-chart", ECharts);

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
