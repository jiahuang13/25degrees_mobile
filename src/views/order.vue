<template>
  <div class="order">
    <div class="loading" v-if="loading">
      <van-loading></van-loading>
    </div>
    <!-- 頂部 nav -->
    <van-nav-bar title="我的訂單" fixed>
      <template #left>
        <van-icon name="arrow-left" size="18" @click="$router.go(-1)" />
      </template>
      <template #right>
        <van-icon name="ellipsis" size="18" />
      </template>
    </van-nav-bar>
    <!-- 內容 -->
    <div class="units" v-if="orders.length > 0">
      <div v-for="(item, index) in orders" :key="index">
        <OrderUnit :order="item"></OrderUnit>
      </div>
    </div>
    <!-- 空狀態 -->
    <div class="empty" v-else>
      <van-icon name="notes-o" size="70" color="#878787"></van-icon>
      <p>尚未有訂單</p>
    </div>
  </div>
</template>

<script>
import { getAllOrdersAPI } from "@/api/order";
import OrderUnit from "@/components/OrderUnit";
export default {
  name: "orderPage",
  components: {
    OrderUnit,
  },
  data() {
    return {
      loading: false,
      activeTab: 0,
      tabList: ["全部", "待付款", "待出貨", "待收貨", "已完成", "退貨/退款"],
      orders: [],
    };
  },
  computed: {
    tabOrders() {
      const status = this.statusMap[this.activeTab]; // 根據 activeTab 動態獲取狀態
      if (!status) return this.orders; // "全部" 返回所有訂單
      return this.orders.filter((order) => order.status === status);
    },
  },
  async mounted() {
    this.loading = true;
    try {
      const res = await getAllOrdersAPI();
      console.log(res);
      const ordersObject = res.data;
      this.orders = Object.values(ordersObject); // 將收到的 orders 對象轉數組
      console.log(this.orders);
    } catch (err) {
      console.log(err);
    } finally {
      this.loading = false;
    }
  },
  methods: {},
};
</script>

<style scoped>
.order {
  background-color: #eaeaea48;
  .loading {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.8); /* 轻微透明的白色背景 */
  }
  .van-nav-bar .van-icon {
    color: #18a999;
  }
  .units {
    padding-top: 45px;
  }
  .empty {
    padding-top: 100px;
    text-align: center;
    p {
      color: #878787;
      font-size: 14px;
    }
  }
}
</style>
