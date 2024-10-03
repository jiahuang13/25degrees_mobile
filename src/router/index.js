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
        component: () => import("@/views/cart.vue"),
        meta: { depth: 1, tabbarName: "cart" },
      },
      {
        path: "user",
        component: () => import("@/views/user.vue"),
        meta: { requiresAuth: true, tabbarName: "user" },
      },
      {
        path: "blog",
        component: () => import("@/views/blog.vue"),
        meta: { depth: 1, tabbarName: "blog" },
      },
      {
        path: "blog/:id",
        component: () => import("@/views/blogDetail.vue"),
        meta: { depth: 2, tabbarName: "blog" },
      },
    ],
  },
  {
    path: "/detail/:id",
    component: () => import("@/views/detail.vue"),
    meta: { depth: 2 },
  },
  { path: "/search", component: () => import("@/views/search.vue") },
  {
    path: "/searchResults",
    component: () => import("@/views/searchResults.vue"),
  },
  {
    path: "/setting",
    component: () => import("@/views/setting.vue"),
    meta: { requiresAuth: true },
  },
  { path: "/address", component: () => import("@/views/address.vue") },
  {
    path: "/addressEdit/:id",
    component: () => import("@/views/addressEdit.vue"),
  },
  {
    path: "/addressAdd",
    name: "addressAdd",
    component: () => import("@/views/addressEdit.vue"),
  },
  {
    path: "/order",
    name: "order",
    component: () => import("@/views/order.vue"),
  },
  {
    path: "/checkOut",
    name: "checkOut",
    component: () => import("@/views/orderCheckOut.vue"),
    meta: { requiresAuth: true, requiresOrder: true },
    props: true,
  },
  {
    path: "/payment",
    name: "payment",
    props: true,
    meta: { requiresPayment: true },
    component: () => import("@/views/payment.vue"),
  },
  {
    path: "/paymentAfter",
    name: "/paymentAfter",
    meta: { requireOrderStatus: true },
    component: () => import("@/views/paymentAfter.vue"),
  },
  { path: "/login", component: () => import("@/views/login.vue") },
  { path: "/register", component: () => import("@/views/register.vue") },
  {
    path: "/vCode",
    name: "vCode",
    component: () => import("@/views/vCode.vue"),
    meta: { requireVCdoe: true },
  },
  {
    path: "/forgotPassword",
    component: () => import("@/views/forgotPassword.vue"),
  },
  {
    path: "/resetPassword",
    name: "resetPassword",
    component: () => import("@/views/resetPassword.vue"),
  },

  // 後台管理系統
  {
    path: "/admin",
    component: () => import("@/views-admin/layout.vue"),
    meta: { requiresAuth: true },
    children: [
      { path: "", redirect: "product" },
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
  const token = getToken(); // 檢查本地是否有token
  const hasAuth = Boolean(token); // 判斷用戶是否已經登入
  const requiresAuth = to.meta.requiresAuth || false; // 獲取是否需要授權
  const requiresOrder = to.meta.requiresOrder || false; // 判斷是否需要結帳驗證
  const requiresPayment = to.meta.requiresPayment || false; // 判斷是否需要付款驗證
  const requireOrderStatus = to.meta.requireOrderStatus || false;
  const requireVCdoe = to.meta.requireVCdoe || false;

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
    // Toast.fail("購物車為空，無法訪問結帳頁面");
    return next("/cart");
  }
  // (requiresOrder && !store.state.cart.checkedList.length) ||
  // (requiresOrder && !from.path === "/addressAdd")

  if (requiresPayment && !to.params.orderId) {
    // Toast.fail("沒有訂單編號，無法訪問付款頁面");
    return next("/order");
  }

  if (requireOrderStatus && !to.params.status) {
    // Toast.fail("無法訪問付款結果頁面");
    return next("/order");
  }

  if (
    (requireVCdoe && !from.path === "/register") ||
    (requireVCdoe && !from.path === "/forgotPassword")
  ) {
    return next("/register");
  } else {
    next();
  }
});

export default router;
