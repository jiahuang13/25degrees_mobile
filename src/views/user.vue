<template>
  <div class="user">
    <div class="bg">
      <van-icon
        name="setting-o"
        color="#fff"
        size="18"
        @click="$router.push('/setting')"
      />
      <div class="avatar">
        <van-image
          round
          width="4rem"
          height="4rem"
          fit="cover"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8QpKHeBbrELrNRa-63gDAsBM2TQR3GzSxCYwMw73LVw&shttps://t3.ftcdn.net/jpg/03/58/90/78/360_F_358907879_Vdu96gF4XVhjCZxN2kCG0THTsSQi8IhT.jpg"
        />
        <p>{{ username }}</p>
      </div>
      <van-icon name="chat-o" dot color="#fff" size="18" />
    </div>
    <div class="order">
      <van-cell title="我的訂單" value="全部訂單" is-link to="/order" />

      <!-- 宮格 -->
      <van-grid icon-size="20">
        <van-grid-item
          icon="pending-payment"
          text="待付款"
          :badge="status.pending"
          @click="toOrderStatus('pending')"
        />
        <van-grid-item
          icon="send-gift-o"
          text="待出貨"
          :badge="status.paid"
          @click="toOrderStatus('paid')"
        />
        <van-grid-item
          icon="logistics"
          text="待收貨"
          :badge="status.shipped"
          @click="toOrderStatus('shipped')"
        />
        <van-grid-item
          icon="refund-o"
          text="退貨/退款"
          :badge="status.canceled"
          @click="toOrderStatus('refunded')"
        />
      </van-grid>

      <van-cell-group>
        <van-cell
          title="我的收藏"
          icon="star-o"
          is-link
          value="0"
          class="myCollection"
        />
        <van-cell title="我的優惠券" icon="coupon-o" is-link value="0" />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { getUserByAuthAPI } from "@/api/user";
import { getOrderStatusCountAPI } from "@/api/order";
export default {
  name: "userPage",
  data() {
    return {
      username: "",
      status: {
        pending: null,
        paid: null,
        shipped: null,
        canceled: null,
      },
    };
  },
  async mounted() {
    //調用user資料
    const resUser = await getUserByAuthAPI();
    if (resUser && !resUser.error) {
      this.username = resUser.data.username;
    }
    //調用 order status
    const resOrder = await getOrderStatusCountAPI();
    if (resOrder && !resOrder.error) {
      // console.log(resOrder);
      this.status = resOrder.data;
      Object.keys(this.status).forEach((key) => {
        if (this.status[key] === 0) {
          this.status[key] = null;
        }
      });
    }
  },
  methods: {
    toOrderStatus(status) {
      this.$router.push({ name: "order", params: { status } });
    },
  },
};
</script>

<style lang="less">
.user {
  background-color: #eaeaea48;
  min-height: 100vh;
  .bg {
    // width: 100vw;
    height: 25vh;
    padding: 20px;
    background-image: url(https://images.unsplash.com/photo-1488330890490-c291ecf62571?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D);
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    .avatar {
      padding-top: 40px;
      text-align: center;
      p {
        color: #fff;
        margin-top: 5px;
        font-weight: 700;
      }
    }
  }
  .order {
    .van-grid-item__content--center {
      padding: 8px;
      .van-icon {
        padding-top: 5px;
      }
      .van-info {
        margin-top: 7px;
      }
    }
  }
  .van-cell-group {
    margin: 10px 0;
  }
}
</style>
