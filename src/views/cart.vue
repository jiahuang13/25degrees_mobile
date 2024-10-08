<template>
  <div class="cart">
    <!-- 頂部 nav -->
    <van-nav-bar :title="`購物車(${list.length})`" fixed>
      <template #left>
        <van-icon name="arrow-left" size="18" @click="$router.go(-1)" />
      </template>
    </van-nav-bar>
    <!-- 商品 -->
    <div class="notEmpty" v-if="list.length > 0">
      <div class="items" v-for="(item, index) in list" :key="item.id">
        <van-swipe-cell
          ><CartItem
            :item="item"
            :index="index"
            :selected="selectedItems[index]"
            @toggle="toggleItem(index)"
            @watch="onItemChange"
          ></CartItem
          ><template #right>
            <van-button
              square
              type="danger"
              text="刪除"
              class="deleteBtn"
              @click="deleteItem(item.id)"
            /> </template
        ></van-swipe-cell>
      </div>
      <!-- 底部全選、計算 -->
      <van-submit-bar
        :price="totalPriceWithoutFee"
        label="總金額："
        currency="$"
        decimal-length=""
        :button-text="`去買單(${total})`"
        button-color="#18a999"
        :disabled="total === 0"
        @submit="checkOut"
      >
        <van-checkbox v-model="checkAll" @click="toggleAll">全選</van-checkbox>
      </van-submit-bar>
    </div>
    <!-- 空狀態 -->
    <van-empty description="購物車是空的，去逛逛吧！" v-else />
  </div>
</template>

<script>
import CartItem from "@/components/CartItem.vue";
import { mapState } from "vuex";
export default {
  name: "cartPage",
  components: {
    CartItem,
  },
  data() {
    return {
      checkAll: false,
      selectedItems: [],
    };
  },
  computed: {
    ...mapState("cart", ["list"]),
    // 動態計算選中的商品
    selectedList() {
      const selectedList = this.list.filter(
        (item, index) => this.selectedItems[index]
      );
      return selectedList;
    },
    // 商品總數量
    total() {
      return this.selectedList.reduce((sum, item) => sum + item.count, 0);
      // console.log(state)
    },
    // 商品總價
    totalPriceWithoutFee() {
      return (
        this.selectedList.reduce(
          (sum, item) =>
            sum + item.count * Math.floor((item.price * item.discount) / 100),
          0
        ) * 100
      );
    },
  },
  mounted() {
    this.$store.dispatch("cart/getList");
    // console.log(this.list);
    // 根據 items 的長度來初始化 selectedItems，默認為未選中
    this.selectedItems = this.list.map(() => false);
    // console.log(this.selectedItems);
  },
  methods: {
    deleteItem(id) {
      this.$store.commit("cart/deleteProduct", id);
    },
    // 更新單個選中狀態
    toggleItem(index) {
      // 將索引為 index 的數組選項取反
      this.$set(this.selectedItems, index, !this.selectedItems[index]);
    },
    // 切換全選/取消全選
    toggleAll() {
      // 當全選按鈕被點擊時，將所有 checkbox 設為相同的狀態
      this.selectedItems = this.selectedItems.map(() => this.checkAll);
    },
    // 當某個 checkbox 被點擊時，檢查是否所有選項都已選中
    onItemChange() {
      // 判斷是否所有選項都被選中
      // console.log(this.selectedItems);
      this.checkAll = this.selectedItems.every((item) => item === true);
    },
    checkOut() {
      // 跳轉結帳頁面前更新checkedList
      this.$store.commit("cart/updateCheckedList", this.selectedList);
      this.$router.push("/checkOut");
    },
  },
};
</script>

<style lang="less">
.cart {
  width: 100vw;
  min-height: 100vh;
  background-color: #eaeaea48;
  .van-nav-bar .van-icon,
  .van-nav-bar__text {
    color: #18a999;
  }
  .notEmpty {
    padding: 50px 0 100px 0;
    .van-submit-bar__bar {
      justify-content: space-between;
      align-items: center;
      margin-bottom: 50px;
      .van-checkbox__icon--checked .van-icon {
        background-color: #18a999;
        border-color: #18a999;
      }
      .van-submit-bar__price {
        color: #18a999;
      }
    }
    .deleteBtn {
      height: 100%;
    }
  }
  .van-empty {
    padding-top: 20vh;
  }
}
</style>
