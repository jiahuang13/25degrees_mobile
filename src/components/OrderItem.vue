<template>
  <div class="OrderItem">
    <div class="top">
      <!-- 圖片 -->
      <van-image width="3rem" height="3rem" fit="cover" :src="item.img" />
      <!-- info -->
      <div class="info">
        <div class="info-top">
          <div class="title">{{ item.name }}</div>
        </div>
        <div class="info-middle">
          <!-- <div class="detail">戴紅色帽子的</div> -->
        </div>
        <div class="info-btm">
          <div class="price">${{ item.price }}</div>
          <div class="count">x{{ item.count }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderItem",
  data() {
    return {
      // item: {
      //   img: "https://i.imgur.com/EptdM3g.jpeg",
      //   price: 88,
      //   name: "洛神花",
      //   count: 3,
      // },
    };
  },
  props: {
    item: {
      // status
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
.OrderItem {
  background-color: #fff;
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
