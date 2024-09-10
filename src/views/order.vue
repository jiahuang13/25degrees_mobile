<template>
  <div class="order">
    <!-- 頂部 nav -->
    <van-nav-bar title="我的訂單" fixed>
      <template #left>
        <van-icon name="arrow-left" size="18" @click="$router.go(-1)" />
      </template>
      <template #right>
        <van-icon name="ellipsis" size="18" />
      </template>
    </van-nav-bar>
    <!-- tab欄 -->
    <van-tabs v-model="activeTab" color="#18A999" animated swipeable>
      <van-tab v-for="(item, index) in tabList" :key="index" :title="item">
        <div class="items" v-if="true">
          <OrderItem></OrderItem>
          <OrderItem></OrderItem>
          <OrderItem></OrderItem>
        </div>
        <!-- 空狀態 -->
        <!-- <div class="empty" v-else>
          <van-icon
            name="https://i.ibb.co/D56QPt4/note.png"
            size="100"
          ></van-icon>
          <p>尚未有訂單</p>
        </div> -->
      </van-tab>
      <!-- <van-tab title="待出貨" name="b"> </van-tab>
      <van-tab title="待收貨" name="c"></van-tab>
      <van-tab title="已完成" name="d"></van-tab>
      <van-tab title="退貨/退款" name="e"></van-tab> -->
    </van-tabs>
  </div>
</template>

<script>
import OrderItem from "@/components/OrderItem";
export default {
  name: "orderPage",
  components: {
    OrderItem,
  },
  data() {
    return {
      activeTab: "",
      tabList: ["全部", "待付款", "待出貨", "待收貨", "已完成", "退貨/退款"],
    };
  },
};
</script>

<style>
.order {
  background-color: #eaeaea48;
  .van-nav-bar .van-icon {
    color: #18a999;
  }
  .van-tabs {
    padding-top: 45px;
    .van-tabs__line {
      width: 20%;
    }
    .van-tab--active {
      color: #18a999;
    }
  }
  .empty {
    padding-top: 100px;
    text-align: center;
    .van-icon {
      padding-left: 15px;
    }
    p {
      color: #878787;
      font-size: 14px;
    }
  }
}
</style>
