<template>
  <div class="paymentAfter">
    <div class="container">
      <!-- 頂部 nav -->
      <van-nav-bar fixed :border="false">
        <template #left>
          <van-icon
            name="arrow-left"
            size="18"
            @click="$router.push('/order')"
          />
        </template>
        <template #right>
          <van-badge
            :content="list.length"
            color="#18a999"
            v-if="list.length > 0"
          >
            <van-icon
              name="cart-o"
              size="20"
              class="right"
              @click="$router.push('/cart')"
            />
          </van-badge>
          <van-icon
            name="cart-o"
            size="20"
            class="right"
            @click="$router.push('/cart')"
            v-else
          />
        </template>
      </van-nav-bar>

      <div class="status">
        <van-icon :name="statusIcon" size="20" />{{ status }}
      </div>
      <van-button type="primary" plain round to="/home">回首頁</van-button>
    </div>

    <van-divider>猜你喜歡</van-divider>
    <!-- 商品列表 -->
    <van-row>
      <van-col span="12" v-for="item in suggestList" :key="item.id"
        ><ProductCard :item="item"></ProductCard
      ></van-col>
    </van-row>
  </div>
</template>

<script>
import { getAllProductRandAPI } from "@/api/product";
import { mapState } from "vuex";
import ProductCard from "@/components/ProductCard.vue";
export default {
  name: "paymentAfter",
  components: {
    ProductCard,
  },
  data() {
    return {
      status: "訂單待付款",
      statusIcon: "warning",
      suggestList: [],
    };
  },
  computed: {
    ...mapState("cart", ["list"]),
  },
  async mounted() {
    // console.log(this.$route.params.status);
    const status = this.$route.params.status;
    if (status === "pending") {
      this.status = "訂單待付款";
      this.statusIcon = "warning";
    } else if (status === "paid") {
      this.status = "付款成功";
      this.statusIcon = "passed";
    } else {
      console.log("路由參數異常");
    }

    try {
      const res = await getAllProductRandAPI();
      console.log(res);
      this.suggestList = res.data;
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    statusMap() {},
  },
};
</script>

<style>
.paymentAfter {
  .container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background: url("../assets/image/paymentAfter-bg2.jpg");
    height: 30vh;
    text-align: center;
    .van-nav-bar {
      background-color: transparent;
      .van-icon {
        color: #fff;
      }
    }
    .status {
      display: flex;
      align-items: center;
      padding-top: 12vh;
      color: #fff;
      .van-icon {
        padding-right: 5px;
      }
    }
    .van-button {
      background-color: transparent;
      width: 70%;
      height: 40px;
      margin-bottom: 15px;
      color: #fff;
      border-color: #fff;
    }
  }
  .van-divider {
    margin-bottom: 5px;
  }
}
</style>
