<template>
  <div class="app">
    <router-view></router-view>
    <van-tabbar route v-model="active" active-color="#18A999">
      <van-tabbar-item icon="home-o" replace to="/home">首頁</van-tabbar-item>
      <van-tabbar-item icon="newspaper-o" replace to="/blog"
        >部落格</van-tabbar-item
      >
      <van-tabbar-item
        icon="cart-o"
        replace
        to="/cart"
        :badge="list.length"
        v-if="list.length > 0"
        >購物車</van-tabbar-item
      >
      <van-tabbar-item icon="cart-o" replace to="/cart" v-else
        >購物車</van-tabbar-item
      >
      <van-tabbar-item icon="user-o" replace to="/user">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "layoutPage",
  data() {
    return {
      active: 0,
    };
  },
  computed: {
    ...mapState("cart", ["list"]),
  },
};
</script>

<style>
.van-info {
  background-color: #18a999;
}
.van-tabbar {
  z-index: 101;
}
</style>
