import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("@/views/layout.vue"),
    meta: { depth: 1 },
    children: [
      { path: "", redirect: "/home" },
      {
        path: "/home",
        component: () => import("@/views/index.vue"),
        meta: { depth: 1 },
      },
      {
        path: "/cart",
        component: () => import("@/views/cart.vue"),
        meta: { depth: 2 },
      },
      { path: "/user", component: () => import("@/views/user.vue") },
      { path: "/blog", component: () => import("@/views/blog.vue") },
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
  { path: "/setting", component: () => import("@/views/setting.vue") },
  { path: "/address", component: () => import("@/views/address.vue") },
  {
    path: "/addressEdit/:id",
    component: () => import("@/views/addressEdit.vue"),
  },
  { path: "/addressAdd", component: () => import("@/views/addressEdit.vue") },
  { path: "/order", component: () => import("@/views/order.vue") },
  { path: "/checkOut", component: () => import("@/views/orderCheckOut.vue") },

  // 後台管理系統
  {
    path: "/admin",
    component: () => import("@/views-admin/layout.vue"),
    children: [
      { path: "", redirect: "/product" },
      {
        path: "/product",
        component: () => import("@/views-admin/product.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
