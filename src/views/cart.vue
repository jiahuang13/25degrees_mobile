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
            :selected="isSelected(item)"
            @toggle="toggleItem(item)"
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
        :price="totalPrice"
        label="總金額："
        currency="$"
        decimal-length=""
        :button-text="`去買單(${total})`"
        button-color="#18a999"
        :disabled="total === 0"
        @submit="$router.push('/checkOut')"
      >
        <van-checkbox v-model="checkAll" @click="toggleAll">全選</van-checkbox>
      </van-submit-bar>
    </div>
    <!-- 空狀態 -->
    <div class="empty" v-else>
      <van-icon
        name="https://i.ibb.co/qmJfLMF/empty-cart.png"
        size="100"
      ></van-icon>
      <p>購物車是空的，去逛逛吧！</p>
    </div>
  </div>
</template>

<script>
import CartItem from "@/components/CartItem.vue";
import { mapState, mapMutations } from "vuex";
export default {
  name: "cartPage",
  components: {
    CartItem,
  },
  data() {
    return {
      checkAll: false,
    };
  },
  computed: {
    ...mapState("cart", ["list", "selectedList"]),
    isCheckedAll() {
      return (
        this.selectedList.length === this.list.length && this.list.length > 0
      );
    },
    // 商品總數量
    total() {
      return this.selectedList.reduce((sum, item) => sum + item.count, 0);
      // console.log(state)
    },
    // 商品總價
    totalPrice() {
      return (
        this.selectedList.reduce(
          (sum, item) =>
            sum + item.count * Math.floor((item.price * item.discount) / 100),
          0
        ) * 100
      );
    },
  },
  watch: {
    isCheckedAll(newVal) {
      console.log("watch checkall", newVal);

      this.checkAll = newVal;
    },
  },
  mounted() {
    this.$store.commit("cart/getList");
    this.$nextTick(() => {
      console.log(this.list, this.selectedList, this.checkAll);
    });
  },
  methods: {
    ...mapMutations("cart", ["updateSelectedList"]),
    // boolean
    isSelected(item) {
      return this.selectedList.includes(item);
    },
    deleteItem(id) {
      this.$store.commit("cart/deleteProduct", id);
    },
    // 更新單個選中狀態
    toggleItem(item) {
      // const isSelected = this.isSelected(item);
      let updatedList;
      if (this.isSelected(item)) {
        updatedList = this.selectedList.filter((i) => i.id !== item.id); // 如果已经选中则取消(filter會留下符合 i.id !== item.id 的商品)
      } else {
        updatedList = [...this.selectedList, item]; // 如果没选中则加入列表
      }
      this.updateSelectedList(updatedList);
    },
    // 切換全選/取消全選
    toggleAll() {
      console.log("前：", this.checkAll);

      const updatedList = this.checkAll ? [] : [...this.list];
      this.updateSelectedList(updatedList);

      this.$nextTick(() => {
        console.log("後：", this.checkAll);
      });
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
  .empty {
    padding-top: 100px;
    text-align: center;
    .van-icon__image {
      opacity: 30%;
    }
    p {
      color: #878787;
      font-size: 14px;
    }
  }
}
</style>
