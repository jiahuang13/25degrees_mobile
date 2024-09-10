<template>
  <div class="OrderArea">
    <div class="top">
      <!-- 圖片 -->
      <van-image
        width="4rem"
        height="4rem"
        fit="cover"
        src="https://img01.yzcdn.cn/vant/ipad.jpeg"
      />
      <!-- info -->
      <div class="info">
        <div class="info-top">
          <div class="title">太鼓的太鼓的歐尼桑</div>
          <div class="status">待付款</div>
        </div>
        <div class="info-middle">
          <div class="detail">戴紅色帽子的</div>
          <div class="count">x2</div>
        </div>
        <div class="price">$200</div>
      </div>
    </div>
    <van-divider />
    <div class="top">
      <!-- 圖片 -->
      <van-image
        width="4rem"
        height="4rem"
        fit="cover"
        src="https://img01.yzcdn.cn/vant/ipad.jpeg"
      />
      <!-- info -->
      <div class="info">
        <div class="info-top">
          <div class="title">太鼓的太鼓的歐尼桑</div>
          <div class="status">待付款</div>
        </div>
        <div class="info-middle">
          <div class="detail">戴紅色帽子的</div>
          <div class="count">x2</div>
        </div>
        <div class="price">$200</div>
      </div>
    </div>
    <van-divider />
    <div class="bottom">
      <div class="total">訂單金額: <span> $400</span></div>
      <div class="action">
        <van-button round>去付款</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderArea",
};
</script>

<style>
.OrderArea {
  background-color: #fff;
  margin-top: 8px;
  .van-divider {
    margin: 0;
  }
  .top {
    padding: 10px 15px 0 15px;
    display: flex;
    max-width: 100vw;
    .van-image {
      padding-right: 10px;
    }
    .info {
      flex-grow: 1;
      .info-top {
        display: flex;
        justify-content: space-between;
        .title {
          font-size: 14px;
        }
        .status {
          color: #18a999;
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
      .price {
        padding-top: 10px;
        float: right;
        font-size: 14px;
      }
    }
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    padding: 0 15px 5px 15px;
    align-items: center;
    .total {
      display: flex;
      justify-content: flex-end;
      font-size: 14px;
      span {
        color: #18a999;
        font-size: 15px;
      }
    }
    .action {
      display: flex;
      justify-content: flex-end;
      .van-button {
        margin-right: -7px;
        height: 30px;
        .van-button--normal {
          padding: 5px;
        }
      }
    }
  }
}
</style>
