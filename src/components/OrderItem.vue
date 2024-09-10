<template>
  <div class="OrderItem">
    <div class="top">
      <!-- 圖片 -->
      <van-image width="4rem" height="4rem" fit="cover" :src="item.img" />
      <!-- info -->
      <div class="info">
        <div class="info-top">
          <div class="title">{{ item.name }}</div>
        </div>
        <div class="info-middle">
          <!-- <div class="detail">戴紅色帽子的</div> -->
        </div>
        <div class="info-btm">
          <div class="price">${{ discountPrice }}</div>
          <div class="count">x{{ item.count }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderItem",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    discountPrice() {
      if (this.item.discount) {
        return Math.floor((this.item.price * this.item.discount) / 100);
      } else {
        return this.item.price;
      }
    },
  },
};
</script>

<style>
.OrderItem {
  background-color: #ffffff7f;
  margin-top: 1px;
  .van-divider {
    margin: 0;
  }
  .top {
    padding: 10px 15px;
    display: flex;
    max-width: 100vw;
    .van-image {
      padding-right: 10px;
    }
    .info {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .info-top {
        display: flex;
        justify-content: space-between;
        .title {
          font-size: 14px;
        }
      }
      .info-middle {
        display: flex;
        justify-content: space-between;
        padding-top: 5px;
        font-size: 12px;
        .detail {
          color: #878787;
        }
      }
      .info-btm {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        padding-top: 5px;
      }
    }
  }
}
</style>
