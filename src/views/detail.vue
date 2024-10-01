<template>
  <div class="detail">
    <!-- 頂部 nav -->
    <van-nav-bar fixed :border="false">
      <template #left>
        <van-icon name="arrow-left" size="18" @click="$router.go(-1)" />
      </template>
      <template #right>
        <van-icon
          name="share-o"
          size="20"
          class="right"
          @click="showShare = true"
        />
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
        <van-icon name="ellipsis" size="20" class="right" />
      </template>
    </van-nav-bar>

    <van-loading v-if="loading" type="spinner" size="30px" color="#18A999" />

    <div v-else>
      <!-- 輪播圖 -->
      <van-swipe class="carousell">
        <van-swipe-item>
          <img :src="item.img" />
        </van-swipe-item>
      </van-swipe>
      <!-- 商品資訊 -->
      <div class="info">
        <div class="name">
          {{ item.name }}
          <span class="discount">{{ item.discount }}折</span>
        </div>
        <div class="discoutPrice">${{ discoutPrice }}</div>
        <div class="originalPrice">${{ item.price }}</div>
        <van-divider>商品詳情</van-divider>
        <div class="content" v-html="item.content"></div>
      </div>
    </div>

    <!-- 底部nav -->
    <van-goods-action>
      <van-goods-action-icon icon="share-o" text="分享" @click="share = true" />
      <van-goods-action-icon
        icon="star"
        text="已收藏"
        color="#18a999"
        v-if="like"
        @click="likeToggle"
      />
      <van-goods-action-icon
        icon="star-o"
        text="收藏"
        @click="likeToggle"
        v-else
      />
      <van-goods-action-button
        color="#18a999"
        text="加入購物車"
        @click="skuShow = true"
      />
    </van-goods-action>

    <!-- 分享面板 -->
    <van-action-sheet v-model="share" title="分享商品">
      <div class="sns">
        <div
          v-for="item in sns"
          :key="item.id"
          class="item"
          @click="onShare(item.id)"
        >
          <van-image width="3rem" height="3rem" :src="item.img" />
          <div>{{ item.name }}</div>
        </div>
      </div>
    </van-action-sheet>

    <!-- sku 簡單版無規格 -->
    <van-action-sheet v-model="skuShow" closeable>
      <div class="content">
        <div class="top">
          <van-image
            width="5rem"
            height="5rem"
            fit="cover"
            radius="2px"
            :src="item.img"
          ></van-image>
          <div class="right">
            <div class="price">${{ discoutPrice }}</div>
            <div class="quota">商品庫存：{{ item.quota }}</div>
          </div>
        </div>
        <van-divider></van-divider>
        <div class="bottom">
          <span>數量</span>
          <van-stepper v-model="count" input-width="30px" button-size="25px" />
        </div>
        <div class="addToCart" @click="addToCart">加入購物車</div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getOneProductAPI } from "@/api/product";

export default {
  name: "detailPage",
  data() {
    return {
      loading: true,
      item: {},
      like: false,
      share: false,
      sns: [
        { id: 1, name: "複製連結", img: require("@/assets/image/link.png") },
        {
          id: 2,
          name: "Facebook",
          img: require("@/assets/image/facebook.png"),
        },
        { id: 3, name: "Line", img: require("@/assets/image/line.png") },
      ],
      skuShow: false,
      count: 1,
      url: window.location.href, // 直接取得當前頁面的完整 URL
    };
  },
  computed: {
    discoutPrice() {
      if (this.item.discount) {
        return Math.floor((this.item.price * this.item.discount) / 100);
      } else {
        return "";
      }
    },
    ...mapState("cart", ["list"]),
  },
  async mounted() {
    // console.log(this.$route.params);
    const res = await getOneProductAPI(this.$route.params.id);
    // console.log(res);
    this.item = res.data;
    // console.log(this.item);
    this.loading = false;
  },
  methods: {
    likeToggle() {
      this.like = !this.like;
      if (this.like) {
        this.$toast.success("成功加入收藏");
      } else {
        this.$toast.success("取消收藏");
      }
    },
    addToCart() {
      // console.log(this.item, this.count);
      this.item.count = this.count;
      // console.log(this.item);
      this.$store.commit("cart/addProduct", this.item);
      this.skuShow = false;
      this.$toast.success("已加入購物車");
      setTimeout(() => {
        this.count = 1;
      }, "1000");
    },
    onShare(platform) {
      const url = encodeURIComponent(this.url); // 將 URL 編碼
      // const title = encodeURIComponent(this.blogTitle);
      let shareUrl = "";

      switch (platform) {
        case 1:
          this.copyLink(this.url);
          this.share = false;
          break;
        case 2:
          // Facebook 分享
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
          window.open(shareUrl, "_blank");
          this.share = false;
          break;
        case 3:
          // Line 分享
          shareUrl = `https://social-plugins.line.me/lineit/share?url=${url}`;
          window.open(shareUrl, "_blank");
          this.share = false;
          break;
        default:
          this.share = false;
          return;
      }
    },
    async copyLink(text) {
      try {
        await navigator.clipboard.writeText(text);
        this.$toast.success("已複製到剪貼板");
      } catch (err) {
        console.error("複製失敗：", err);
        this.$toast.fail("複製失敗，請手動選取文字複製！");
      }
    },
  },
};
</script>

<style>
.detail {
  .van-loading {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
  }
  .van-swipe__indicator--active {
    background-color: #18a999;
  }
  .van-nav-bar {
    background-color: transparent;
    .van-icon {
      color: #fff;
      background-color: #676769a2;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      text-align: center;
      line-height: 30px;
    }
    .right {
      margin-left: 10px;
    }
    .van-info {
      background-color: #18a999;
    }
    .van-nav-bar__right {
      padding-right: 7px;
      .van-badge__wrapper {
        margin-top: 5px;
      }
    }
    .van-nav-bar__left {
      padding-left: 7px;
    }
  }
  .carousell {
    /* padding-top: 40px; */
    img {
      width: 100vw;
      height: 45vh;
      object-fit: cover;
    }
  }
  .info {
    padding: 5px 10px;
    /* text-align: center; */
    .name {
      font-size: 18px;
      padding-bottom: 10px;
    }
    .discount {
      border: 1px solid #18a999;
      padding: 2px;
      color: #18a999;
      font-size: 14px;
      display: block;
      float: right;
    }
    .discoutPrice {
      font-size: 18px;
      color: #18a999;
    }
    .originalPrice {
      color: #969799;
      text-decoration: line-through;
      font-size: 14px;
    }

    .content {
      font-size: 14px;
      padding-bottom: 50px;
    }
  }
  .van-action-sheet__content {
    padding: 16px 16px;
    /* height: 30vh; */
    .content {
      .top {
        display: flex;
        align-items: end;
        .right {
          padding-left: 15px;
          padding-bottom: 3px;
          .price {
            color: #18a999;
          }
          .quota {
            font-size: 13px;
            color: #969799;
          }
        }
      }
      .bottom {
        display: flex;
        justify-content: space-between;
        padding-top: 5px;
        span {
          font-size: 14px;
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
      .addToCart {
        color: #fff;
        background-color: #18a999;
        border-radius: 5px;
        text-align: center;
        padding: 8px 4px;
        font-size: 14px;
        position: absolute;
        bottom: 10px;
        width: 90vw;
      }
    }
  }
  .sns {
    display: flex;
    justify-content: space-around;
    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 14px;
      .van-image {
        padding-bottom: 10px;
      }
    }
  }
}
</style>
