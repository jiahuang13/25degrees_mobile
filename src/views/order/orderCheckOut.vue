<template>
  <div class="checkOut">
    <!-- 頂部 nav -->
    <van-nav-bar title="結帳" fixed>
      <template #left>
        <van-icon name="arrow-left" size="18" @click="$router.push('/cart')" />
      </template>
    </van-nav-bar>
    <!-- 收貨人 -->
    <div class="contact" @click="addressHandler">
      <van-icon name="location-o" size="18" class="left" color="#18a999" />
      <div class="info" v-if="contact.address">
        <div class="top">
          <span>{{ contact.recipient_name }} {{ contact.phone }}</span>
        </div>
        <div class="bottom">{{ contact.address }}</div>
      </div>
      <div class="empty" v-else>新增收貨地址</div>
      <van-icon name="arrow" size="18" class="right" color="#eaeaea" />
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
      :price="totalPrice * 100"
      label="總付款金額："
      currency="$"
      decimal-length=""
      button-text="結帳"
      button-color="#18a999"
      :loading="loading"
      @submit="submit"
    >
    </van-submit-bar>
  </div>
</template>

<script>
import OrderItem from "@/components/OrderItem.vue";
import { getDefaultAddressAPI, getAddressOneAPI } from "@/api/address";
import { createOrderAPI } from "@/api/order";
import { mapState, mapGetters } from "vuex";
export default {
  name: "checkOut",
  components: {
    OrderItem,
  },
  data() {
    return {
      note: "",
      contact: {
        id: "",
        address: "",
        phone: "",
        recipient_name: "",
      },
      orderId: "",
      loading: true,
    };
  },
  computed: {
    ...mapState("cart", ["checkedList"]),
    ...mapGetters("cart", ["total", "totalPrice", "finalList"]),
  },
  async mounted() {
    await this.getAddress();
    this.loading = false;
  },
  methods: {
    async getAddress() {
      const id = this.$route.params.selectedId;
      try {
        // 如果是從選擇頁面過來，調用選擇的收貨地址
        if (id) {
          const res = await getAddressOneAPI(id);
          this.contact = res.data;
        } else {
          // 否則調用預設地址
          const res = await getDefaultAddressAPI();
          this.contact = res.data;
        }
      } catch (err) {
        console.error(err);
      }
    },
    async submit() {
      // items(id, count, price), totalprice
      const data = {
        finalList: this.finalList,
        totalPrice: this.totalPrice,
        address_id: this.contact.id,
      };
      try {
        const res = await createOrderAPI(data);
        console.log(res);
        // 訂單建立成功後：移除購物車中 checkedList 品項
        this.$store.commit("cart/removeCheckedListFromList");
        this.orderId = res.data.orderId;
      } catch (err) {
        console.error(err);
      }
      this.$router.push({ name: "payment", params: { orderId: this.orderId } });
    },
    addressHandler() {
      if (this.contact.address) {
        this.$router.push({ path: "/address", query: { select: true } });
      } else {
        this.$router.push({
          name: "addressAdd",
          params: { is_default: true, checkOut: true },
        });
      }
    },
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
