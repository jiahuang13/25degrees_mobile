import Vue from "vue";
import VueRouter from "vue-router";
import { getToken } from "@/utils/auth";
import { Toast } from "vant";
import store from "@/store"; // Vuex 存取

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("@/views/layout.vue"),
    meta: { depth: 1 },
    children: [
      { path: "", redirect: "home" },
      {
        path: "home",
        component: () => import("@/views/index.vue"),
        meta: { depth: 1, tabbarName: "home" },
      },
      {
        path: "cart",
        component: () => import("@/views/product/cart.vue"),
        meta: { depth: 1, tabbarName: "cart" },
      },
      {
        path: "user",
        component: () => import("@/views/user/user.vue"),
        meta: { requiresAuth: true, tabbarName: "user" },
      },
      {
        path: "blog",
        component: () => import("@/views/blog/blog.vue"),
        meta: { depth: 1, tabbarName: "blog" },
      },
      {
        path: "blog/:id",
        component: () => import("@/views/blog/blogDetail.vue"),
        meta: { depth: 2, tabbarName: "blog" },
      },
    ],
  },
  {
    path: "/detail/:id",
    component: () => import("@/views/product/detail.vue"),
    meta: { depth: 2 },
  },
  { path: "/search", component: () => import("@/views/product/search.vue") },
  {
    path: "/searchResults",
    component: () => import("@/views/product/searchResults.vue"),
  },
  {
    path: "/setting",
    component: () => import("@/views/user/setting.vue"),
    meta: { requiresAuth: true },
  },
  { path: "/address", component: () => import("@/views/user/address.vue") },
  {
    path: "/addressEdit/:id",
    component: () => import("@/views/user/addressEdit.vue"),
  },
  {
    path: "/addressAdd",
    name: "addressAdd",
    component: () => import("@/views/user/addressEdit.vue"),
  },
  {
    path: "/order",
    name: "order",
    component: () => import("@/views/order/order.vue"),
  },
  {
    path: "/checkOut",
    name: "checkOut",
    component: () => import("@/views/order/orderCheckOut.vue"),
    meta: { requiresAuth: true, requiresOrder: true },
    props: true,
  },
  {
    path: "/payment",
    name: "payment",
    props: true,
    meta: { requiresPayment: true },
    component: () => import("@/views/order/payment.vue"),
  },
  {
    path: "/paymentAfter",
    name: "/paymentAfter",
    meta: { requireOrderStatus: true },
    component: () => import("@/views/order/paymentAfter.vue"),
  },
  { path: "/login", component: () => import("@/views/user/login.vue") },
  { path: "/register", component: () => import("@/views/user/register.vue") },
  {
    path: "/vCode",
    name: "vCode",
    component: () => import("@/views/user/vCode.vue"),
    meta: { requireEmail: true },
  },
  {
    path: "/forgotPassword",
    component: () => import("@/views/user/forgotPassword.vue"),
  },
  {
    path: "/resetPassword",
    name: "resetPassword",
    component: () => import("@/views/user/resetPassword.vue"),
    meta: { requireEmail: true },
  },

  // 後台管理系統
  {
    path: "/admin",
    component: () => import("@/views-admin/layout.vue"),
    meta: { requiresAuth: true },
    children: [
      { path: "", redirect: "dashboard" },
      {
        path: "product",
        component: () => import("@/views-admin/product.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "user",
        component: () => import("@/views-admin/user.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "blog",
        component: () => import("@/views-admin/blog.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "order",
        component: () => import("@/views-admin/order.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "dashboard",
        component: () => import("@/views-admin/dashboard.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
  // 添加 scrollBehavior 配置
  scrollBehavior(to, from, savedPosition) {
    // 如果有儲存的滾動位置，則返回儲存的位置（例如按返回鍵時）
    if (savedPosition) {
      return savedPosition;
    } else {
      // 否則返回到頂部
      return { x: 0, y: 0 };
    }
  },
});

// 路由守衛
router.beforeEach((to, from, next) => {
  const token = getToken(); // 檢查本地是否有 token
  const hasAuth = Boolean(token); // 判斷用戶是否已經登入
  const requiresAuth = to.meta.requiresAuth || false; // 獲取是否需要授權
  const requiresOrder = to.meta.requiresOrder || false; // 判斷是否需要結帳驗證
  const requiresPayment = to.meta.requiresPayment || false; // 判斷是否需要付款驗證
  const requireOrderStatus = to.meta.requireOrderStatus || false;
  const requireEmail = to.meta.requireEmail || false;

  // 未授權情況且目標路由需要授權，跳轉至登入頁面
  if (requiresAuth && !hasAuth) {
    Toast.fail("請先登入");
    return next({
      path: "/login",
      query: { redirect: to.fullPath }, // 保存當前頁面的完整路徑
    });
  }

  // 若已經登入但試圖訪問 login 頁面，重定向至首頁
  if (to.path === "/login" && hasAuth) {
    return next("/home");
  }

  // 檢查結帳和付款頁面的額外驗證條件
  if (requiresOrder && !store.state.cart.checkedList.length) {
    Toast.fail("購物車為空，無法訪問結帳頁面");
    return next("/cart");
  }

  if (requiresPayment && !to.params.orderId) {
    Toast.fail("沒有訂單編號，無法訪問付款頁面");
    return next("/order");
  }

  if (requireOrderStatus && !to.params.status) {
    Toast.fail("無法訪問付款結果頁面");
    return next("/order");
  }

  if (
    requireEmail &&
    from.path !== "/register" &&
    from.path !== "/forgotPassword" &&
    to.params.email !== "undefined"
  ) {
    return next("/login");
  }

  // 檢查是否有參數差異，避免重複導航
  if (
    to.path === from.path &&
    JSON.stringify(to.query) === JSON.stringify(from.query)
  ) {
    return next(false); // 如果路徑和 query 都一致，則中止導航
  }

  // 當條件都滿足時，繼續導航
  next();
});

export default router;
