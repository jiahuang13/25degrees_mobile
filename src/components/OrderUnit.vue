<template>
  <div class="OrderUnit">
    <van-cell
      class="unit"
      :title="`訂單: ${order.id}`"
      :value="newStatus"
      :border="false"
    />
    <div v-for="(item, index) in order.items" :key="index">
      <OrderItem :item="item"></OrderItem>
    </div>
    <van-cell
      class="unit"
      :title="`訂單金額: $${order.total}`"
      :value="`${totalCount} 商品`"
      :border="false"
    />
    <div class="button">
      <van-button @click="actionFn">{{ action }}</van-button>
    </div>
  </div>
</template>

<script>
import OrderItem from "./OrderItem.vue";
export default {
  name: "OrderUnit",
  components: {
    OrderItem,
  },
  data() {
    return {
      statusMap: {
        // 狀態映射表
        pending: "待付款",
        paid: "待出貨",
        shipped: "待收貨",
        delivered: "已完成",
        refunded: "退貨/退款",
      },
      actionMap: {
        pending: "去付款",
        paid: "確認收貨",
        shipped: "確認收貨",
        delivered: "評價",
        refunded: "退貨/退款詳情",
      },
    };
  },
  props: {
    order: {
      // id, status, total, itemsArray
      type: Object,
      required: true,
    },
  },
  computed: {
    newStatus() {
      return this.statusMap[this.order.status];
    },
    action() {
      return this.actionMap[this.order.status];
    },
    totalCount() {
      const totalCount = this.order.items.reduce((acc, item) => {
        return acc + item.count;
      }, 0);
      return totalCount;
    },
  },
  methods: {
    actionFn() {
      console.log(this.order);
    },
  },
};
</script>

<style>
.OrderUnit {
  background-color: #eae7e750;
  margin-top: 10px;
  .van-cell.unit {
    margin-top: 1px;
    padding: 5px 16px;
  }
  .button {
    background-color: #fff;
    margin-top: 1px;
    display: flex;
    justify-content: flex-end;
    .van-button {
      height: 35px;
      margin: 7px 10px;
      padding: 10px 30px;
      color: #fff;
      background-color: #18a999;
      border: transparent;
    }
  }
}
</style>
