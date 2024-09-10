<template>
  <div class="checkOut">
    <!-- 頂部 nav -->
    <van-nav-bar title="結帳" fixed>
      <template #left>
        <van-icon name="arrow-left" size="18" @click="$router.push('/cart')" />
      </template>
    </van-nav-bar>
    <!-- 收貨人 -->
    <div class="contact">
      <van-icon name="location-o" size="18" class="left" color="#18a999" />
      <div class="info" v-if="defaultAddress">
        <div class="top">
          <span>{{ defaultAddress.name }} {{ defaultAddress.tel }}</span>
        </div>
        <div class="bottom">{{ defaultAddress.address }}</div>
      </div>
      <div
        class="empty"
        v-else
        @click="$router.push({ path: '/address', query: { type: 'select' } })"
      >
        請設定收貨地址
      </div>
      <van-icon
        name="arrow"
        size="18"
        class="right"
        color="#eaeaea"
        @click="$router.push({ path: '/address', query: { type: 'select' } })"
      />
    </div>
    <!-- 訂單列 -->
    <div class="order">
      <div class="items" v-for="item in checkedList" :key="item.id">
        <OrderItem :item="item"></OrderItem>
      </div>
    </div>
    <!-- 運費 -->
    <div class="shippingFee">
      <div class="l">運費</div>
      <div class="r">$100</div>
    </div>
    <!-- 備註 -->
    <div class="note">
      <van-field
        v-model="note"
        label="備註"
        placeholder="管理室代收/電話聯絡時間..."
      />
    </div>
    <!-- 底部計算 -->
    <van-submit-bar
      :price="totalPrice + 10000"
      label="總付款金額："
      currency="$"
      decimal-length=""
      button-text="結帳"
      button-color="#18a999"
    >
    </van-submit-bar>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import OrderItem from "@/components/OrderItem.vue";
export default {
  name: "checkOut",
  data() {
    return {
      note: "",
    };
  },
  components: {
    OrderItem,
  },
  computed: {
    ...mapState("cart", ["checkedList"]),
    ...mapState("user", ["addressList"]),
    ...mapGetters("cart", ["total", "totalPrice"]),
    ...mapGetters("user", ["defaultAddress"]),
  },
  mounted() {
    // console.log(this.$route.query.id);
  },
};
</script>

<style>
.checkOut {
  background-color: #eaeaea48;
  .van-nav-bar .van-icon,
  .van-submit-bar__price {
    color: #18a999;
  }
  .contact {
    background-color: #fff;
    padding: 55px 15px 10px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      padding-right: 15px;
      padding-left: 10px;
    }
    .info {
      flex-grow: 1;
      .top {
        display: flex;
        font-size: 14px;
      }
      .bottom {
        padding-top: 5px;
        font-size: 12px;
      }
    }
    .right {
      padding-left: 15px;
    }
    .empty {
      font-size: 14px;
    }
  }
  .order {
    padding-top: 5px;
  }
  .shippingFee {
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    padding: 10px 15px;
    font-size: 14px;
    margin-top: 1px;
  }
  .note {
    margin-top: 1px;
  }
}
</style>
