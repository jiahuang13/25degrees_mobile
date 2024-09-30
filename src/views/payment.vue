<template>
  <div class="payment">
    <!-- 頂部 nav -->
    <van-nav-bar title="選擇付款方式" fixed>
      <template #left>
        <van-icon name="arrow-left" size="18" @click="leavePayment" />
      </template>
    </van-nav-bar>

    <van-loading v-if="loading" type="spinner" size="30px" color="#18A999" />

    <div v-else id="paypal-button-container" class="paypal"></div>
  </div>
</template>

<script>
import { getOneOrderById, paypalCreateAPI, paypalVerifyAPI } from "@/api/order";

export default {
  name: "paymentPage",
  data() {
    return {
      loading: true,
      amount: "",
      orderId: "",
      paypalId: "",
    };
  },
  async mounted() {
    // 獲取此訂單 id 調用 api 獲得總金額
    this.orderId = this.$route.params.orderId;
    try {
      const res = await getOneOrderById(this.orderId);
      console.log(res.data);
      this.amount = res.data.total;
    } catch (err) {
      console.log(err);
    }

    // 动态加载 PayPal SDK 并在加载完成后初始化 PayPal 按钮
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=AZes3SsKmBRbHjSENKxueX2URoOMLCGwpwg3hvfqewuqBpk3eD0Tj7B6HpKjS4be_srCCZLJTdn88N0g&currency=TWD`;
    script.async = true;

    // 确保在 PayPal SDK 加载完成后调用初始化按钮函数
    script.onload = () => {
      this.initPayPalButton();
    };

    document.body.appendChild(script);

    this.loading = false;
  },
  methods: {
    async createOrder() {
      try {
        const res = await paypalCreateAPI(this.amount);
        console.log("Order ID from backend:", res.id); // 打印订单ID
        return res.id; // 返回创建的订单 ID
      } catch (error) {
        console.error("Failed to create order", error);
      }
    },
    initPayPalButton() {
      const vm = this; // 将当前Vue实例的引用保存在变量vm中

      /* global paypal */
      paypal
        .Buttons({
          /* eslint-disable no-unused-vars */
          createOrder: async (_, __) => {
            return await vm.createOrder();
          },
          /* eslint-enable no-unused-vars */
          onApprove: (data, actions) => {
            return actions.order.get().then(async function (orderDetails) {
              vm.paypalId = orderDetails.id;

              // 在这里处理支付完成后的逻辑: 將id回傳後端、訂單狀態頁面移動、重定向
              const res = await paypalVerifyAPI(vm.orderId, vm.paypalId);
              console.log(res);

              const paymentStatus = res.status === 200 ? "paid" : "pending";
              vm.$router.push({
                name: "/paymentAfter",
                params: { status: paymentStatus },
              });
            });
          },
          onError: (err) => {
            console.error("PayPal Checkout Error: ", err);
            vm.$router.push({
              name: "/paymentAfter",
              params: { status: "pending" },
            });
          },
        })
        .render("#paypal-button-container"); // 渲染 PayPal 按钮
    },
    leavePayment() {
      this.$dialog
        .confirm({
          message: "付款未完成，確定離開嗎？",
          confirmButtonText: "確定",
          cancelButtonText: "取消",
        })
        .then(() => {
          this.$router.push("/order");
        })
        .catch(() => {});
    },
  },
};
</script>

<style>
.payment {
  background-color: #eaeaea48;
  .van-loading {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
  }
  .van-nav-bar .van-icon,
  .van-submit-bar__price {
    color: #18a999;
  }
  .paypal {
    padding-top: 80px;
    width: 90%;
    margin: 0 auto;
  }
}
</style>
