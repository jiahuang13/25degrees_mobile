<template>
  <div class="CartItem">
    <!-- 勾選框 -->
    <div class="checkbox-wrapper">
      <div class="round">
        <input
          type="checkbox"
          @change="checkToggle"
          :checked="selected"
          :id="`checkbox${index}`"
        />
        <label :for="`checkbox${index}`"></label>
      </div>
    </div>

    <!-- 圖片 -->
    <van-image
      width="4rem"
      height="4rem"
      fit="cover"
      radius="5px"
      :src="item.img"
      @click="$router.push(`/detail/${item.id}`)"
    />
    <!-- info -->
    <div class="info">
      <div class="title" @click="$router.push(`/detail/${item.id}`)">
        {{ item.name }}
      </div>
      <div class="info-down">
        <div class="price" @click="$router.push(`/detail/${item.id}`)">
          <div class="discoutPrice">${{ discountPrice }}</div>
          <div class="originalPrice">${{ item.price }}</div>
        </div>
        <!-- 計數器 -->
        <van-stepper
          v-model="count"
          input-width="30px"
          button-size="25px"
          @change="updateCount()"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
    index: Number, // 接收從父組件傳遞的 index
    selected: Boolean, // 接收該項目的選中狀態
  },
  computed: {
    discountPrice() {
      if (this.item.discount) {
        return Math.floor((this.item.price * this.item.discount) / 100);
      } else {
        return "";
      }
    },
  },
  data() {
    return {
      count: 1,
    };
  },
  mounted() {
    // console.log(this.item.discount);
    this.count = this.item.count;
  },
  methods: {
    updateCount() {
      // console.log(this.item.id, this.count);
      const obj = { id: this.item.id, count: this.count };
      this.$store.commit("cart/updateCount", obj);
    },
    checkToggle() {
      // console.log(this.index);
      this.$emit("toggle", this.index);
      // this.$store.commit("cart/checkToggle", this.item.id);
      this.$emit("watch");
    },
  },
};
</script>

<style>
.CartItem {
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 5px;
  margin: 5px 5px;
  border-radius: 5px;
  height: 80px;

  /* checkbox */
  .checkbox-wrapper {
    padding: 0 0.25rem;
    .round {
      position: relative;
    }
    .round label {
      background-color: #fff;
      border: 1px solid #ccc;
      border-radius: 50%;
      cursor: pointer;
      height: 1.25rem;
      width: 1.25rem;
      display: block;
      position: relative; /* 保持相對定位，以便 :after 可以定位在內部 */
    }
    .round label:after {
      border: 2px solid #fff;
      border-top: none;
      border-right: none;
      content: "";
      height: 0.3rem;
      left: 0.3rem;
      opacity: 0;
      position: absolute;
      top: 5px;
      width: 7px;
      transform: rotate(-45deg) scale(0.8); /* 初始時縮小一點 */
      transition: opacity 0.3s ease, transform 0.3s ease; /* 過渡效果設置 */
    }
    .round input[type="checkbox"] {
      visibility: hidden;
      display: none;
      opacity: 0;
    }
    .round input[type="checkbox"]:checked + label {
      background-color: #18a999;
      border-color: #18a999;
    }
    .round input[type="checkbox"]:checked + label:after {
      opacity: 1; /* 勾選時顯示勾勾 */
      transform: rotate(-45deg) scale(1); /* 當選中時顯示並放大到正常大小 */
    }
  }

  .van-image {
    padding: 0 5px;
  }
  .info {
    padding: 0 10px;
    flex-grow: 2;
    .title {
      font-size: 16px;
    }
    .info-down {
      display: flex;
      justify-content: space-between;
      padding-top: 20px;
      .price {
        display: flex;
        align-items: center;
        .discoutPrice {
          font-weight: 600;
          color: #18a999;
        }
        .originalPrice {
          padding-left: 5px;
          font-size: 12px;
          color: #969799;
          text-decoration: line-through;
        }
      }
      .van-stepper {
        .van-stepper__minus,
        .van-stepper__plus,
        .van-stepper__input {
          background-color: #fff;
          border: 1px solid #eaeaea;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
