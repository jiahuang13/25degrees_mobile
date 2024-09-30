<template>
  <div class="app">
    <router-view class="router-view"></router-view>
    <van-tabbar route :active="active" active-color="#18A999">
      <van-tabbar-item icon="home-o" replace to="/home" name="home"
        >首頁</van-tabbar-item
      >
      <van-tabbar-item icon="newspaper-o" replace to="/blog" name="blog"
        >部落格</van-tabbar-item
      >
      <van-tabbar-item
        icon="cart-o"
        replace
        to="/cart"
        :badge="list.length"
        v-if="list.length > 0"
        name="cart"
        >購物車</van-tabbar-item
      >
      <van-tabbar-item icon="cart-o" replace to="/cart" v-else
        >購物車</van-tabbar-item
      >
      <van-tabbar-item icon="user-o" replace to="/user" name="user"
        >我的</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "layoutPage",
  data() {
    return {
      active: "home",
    };
  },
  computed: {
    ...mapState("cart", ["list"]),
  },
  watch: {
    // 監聽路由變化
    $route(to) {
      // console.log(to.path, this.$route.meta.tabbarName);
      if (to.meta.tabbarName) {
        this.active = to.meta.tabbarName; //跳轉/blog/:id高亮還是不生效
      } else {
        this.active = "";
      }
    },
  },
};
</script>

<style>
.app {
  .router-view {
    max-height: 100vh;
    max-width: 100vw;
  }
  .van-info {
    background-color: #18a999;
  }
  .van-tabbar {
    z-index: 101;
  }
}
</style>
