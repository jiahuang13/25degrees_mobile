<template>
  <div class="ProductCard" @click="$router.push(`/detail/${item.id}`)">
    <!-- 圖片 -->
    <van-image width="10rem" height="10rem" fit="cover" :src="item.img" />
    <!-- 標題 -->
    <div class="info">
      <div class="van-ellipsis title">{{ item.name }}</div>
      <div class="price">
        <div class="discoutPrice">
          ${{ Math.floor((item.price * item.discount) / 100) }}
        </div>
        <div class="originalPrice">${{ item.price }}</div>
      </div>
      <div class="discountPercent">{{ item.discount }}折</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
.ProductCard {
  padding: 10px 0;
  width: 10rem;
  margin: 0 auto;
  .info {
    text-align: center;
    .title {
      font-size: 14px;
    }
    .price {
      display: flex;
      justify-content: center;
      align-items: center;
      .discountPrice {
        font-size: 14px;
      }
      .originalPrice {
        padding-left: 5px;
        font-size: 12px;
        color: #969799;
        text-decoration: line-through;
      }
    }
    .discountPercent {
      border: 1px solid #18a999;
      padding: 2px;
      color: #18a999;
      font-size: 10px;
      width: 25px;
      margin: 0 auto;
    }
  }
}
</style>
