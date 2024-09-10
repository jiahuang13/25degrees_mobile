<template>
  <div class="detail">
    <div id="fb-root"></div>
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
    <!-- 底部nav -->
    <van-goods-action>
      <van-goods-action-icon
        icon="share-o"
        text="分享"
        @click="showShare = true"
      />
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
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="shareOptions"
      @select="shareSelect"
    />
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
      item: {},
      like: false,
      showShare: false,
      shareOptions: [
        {
          name: "Facebook",
          icon: "https://i.ibb.co/xY2cTk5/facebook-logo.png",
        },
        { name: "Line", icon: "https://i.ibb.co/GHkMPys/line-logo.png" },
        { name: "複製連結", icon: "link" },
        { name: "二维码", icon: "qrcode" },
      ],
      shareUrl: "https://youzan.github.io/vant/v2/#/zh-CN/icon",
      sdkLoaded: false,
      skuShow: false,
      count: 1,
    };
  },
  computed: {
    facebookShareUrl() {
      return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        this.shareUrl
      )}&src=sdkpreparse`;
    },
    lineUrl() {
      return `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
        this.shareUrl
      )}`;
    },
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
    this.item = res.data.data;
    // console.log(this.item);
    await this.facebookSDK();
    this.sdkLoaded = true;
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
    facebookSDK() {
      const script = document.createElement("script");
      script.async = true;
      script.defer = true;
      script.crossorigin = "anonymous";
      script.src =
        "https://connect.facebook.net/zh_TW/sdk.js#xfbml=1&version=v19.0";
      script.nonce = "sNkUCo1v";
      document.getElementById("fb-root").appendChild(script);
    },
    shareSelect(option, index) {
      console.log(option, index);
      if (index === 0) {
        window.open(this.facebookShareUrl, "_blank");
      } else if (index === 1) {
        window.open(this.lineUrl, "_blank");
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
  },
};
</script>

<style>
.detail {
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
    height: 30vh;
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
}
</style>
