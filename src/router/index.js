import Vue from "vue";
import VueRouter from "vue-router";
import { getToken } from "@/utils/auth";
import { Toast } from "vant";

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
  { path: "/addressAdd", component: () => import("@/views/addressEdit.vue") },
  { path: "/order", component: () => import("@/views/order.vue") },
  {
    path: "/checkOut",
    name: "checkOut",
    component: () => import("@/views/orderCheckOut.vue"),
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: "/payment",
    name: "payment",
    props: true,
    component: () => import("@/views/payment.vue"),
  },
  {
    path: "/paymentAfter",
    name: "/paymentAfter",
    component: () => import("@/views/paymentAfter.vue"),
  },
  { path: "/login", component: () => import("@/views/login.vue") },
  { path: "/register", component: () => import("@/views/register.vue") },
  {
    path: "/verificationCode",
    component: () => import("@/views/verificationCode.vue"),
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
  if (to.meta.requiresAuth && !token) {
    Toast("請先登入");
    return next("/login"); // 若未認證，跳轉至登入頁面
  } else if (to.path === "/login" && token) {
    // 若用戶已經登入，防止再訪問 login 頁面
    return next("/home");
  } else if (from.path === to.path) {
    // 避免重複導航
    return next(false); // 阻止重複導航
  } else {
    next(); // 允許導航
  }
});

export default router;
