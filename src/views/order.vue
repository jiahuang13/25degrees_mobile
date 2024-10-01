<template>
  <div class="orderPage">
    <van-loading v-if="loading" type="spinner" size="30px" color="#18A999" />

    <!-- 頂部 nav -->
    <van-nav-bar title="我的訂單" fixed>
      <template #left>
        <van-icon name="arrow-left" size="18" @click="$router.push('/user')" />
      </template>
      <template #right>
        <van-icon name="ellipsis" size="18" />
      </template>
    </van-nav-bar>

    <!-- tab欄 -->
    <van-tabs
      v-model="activeTab"
      color="#18A999"
      animated
      swipeable
      sticky
      @change="changeTab"
    >
      <van-tab
        v-for="item in tabList"
        :key="item.status"
        :title="item.title"
        :name="item.status"
      >
        <!-- 內容 -->
        <div class="units" v-if="filteredOrders.length > 0">
          <div v-for="(item, index) in filteredOrders" :key="index">
            <OrderUnit :order="item"></OrderUnit>
          </div>
        </div>
        <!-- 空狀態 -->
        <div class="empty" v-else>
          <van-icon name="notes-o" size="70" color="#878787"></van-icon>
          <p>尚未有訂單</p>
        </div>
      </van-tab>
    </van-tabs>
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
      activeTab: "all",
      tabList: [
        { title: "全部", status: "all" },
        { title: "待付款", status: "pending" },
        { title: "待出貨", status: "paid" },
        { title: "待收貨", status: "shipped" },
        { title: "已完成", status: "completed" },
        { title: "不成立", status: "canceled" },
        { title: "退貨/退款", status: "refunded" },
      ],
      orders: [],
    };
  },
  computed: {
    filteredOrders() {
      if (this.activeTab === "all") {
        return this.orders; // 返回所有訂單
      }
      return this.orders.filter((order) => order.status === this.activeTab);
    },
  },
  async mounted() {
    this.loading = true;
    if (this.$route.params.status) {
      this.activeTab = this.$route.params.status;
    }
    try {
      const res = await getAllOrdersAPI();
      // console.log(res);
      const ordersObject = res.data;
      this.orders = Object.values(ordersObject); // 將收到的 orders 對象轉數組
      // console.log(this.orders);
    } catch (err) {
      console.log(err);
    } finally {
      this.loading = false;
    }
  },
  methods: {
    changeTab(status) {
      this.activeTab = status;
    },
  },
};
</script>

<style>
.orderPage {
  background-color: #eaeaea48;
  min-height: 100vh;
  .van-loading {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
  }
  .van-nav-bar .van-icon {
    color: #18a999;
  }
  .van-tabs {
    padding-top: 46px;
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
