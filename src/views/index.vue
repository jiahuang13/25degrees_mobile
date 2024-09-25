<template>
  <div class="home">
    <!-- 頂部 nav -->
    <van-nav-bar fixed>
      <template #left>
        <van-icon name="search" size="18" @click="$router.push('/search')" />
      </template>
      <template #right>
        <van-icon name="chat-o" size="18" />
      </template>
      <template #title>
        <van-image width="60" :src="logoSrc" />
      </template>
    </van-nav-bar>
    <!-- tab欄 -->
    <van-tabs v-model="activeTab" color="#18A999" animated swipeable sticky>
      <van-tab title="香氛蠟燭" name="a">
        <!-- 輪播圖 -->
        <van-swipe :autoplay="3000" class="carousell">
          <van-swipe-item v-for="(image, index) in images" :key="index">
            <img :src="image" />
          </van-swipe-item>
        </van-swipe>
        <!-- 文字介紹 -->
        <p class="title">嶄新聞香體驗</p>
        <p class="content">
          在放鬆身心的同時，營造出獨特的氛圍，<br />讓家變成一個充滿溫馨和舒適感的地方。
        </p>
        <!-- 商品列表 -->
        <van-row>
          <van-col span="12" v-for="item in incenseList" :key="item.id"
            ><ProductCard :item="item"></ProductCard
          ></van-col>
        </van-row>
      </van-tab>
      <van-tab title="身體保養" name="b">
        <!-- 商品列表 -->
        <van-row>
          <van-col span="12" v-for="item in bodyList" :key="item.id"
            ><ProductCard :item="item"></ProductCard
          ></van-col>
        </van-row>
      </van-tab>
      <van-tab title="臉部保養" name="c">
        <!-- 商品列表 -->
        <van-row>
          <van-col span="12" v-for="item in faceList" :key="item.id"
            ><ProductCard :item="item"></ProductCard
          ></van-col>
        </van-row>
      </van-tab>
      <van-tab title="天然精油" name="d">
        <!-- 商品列表 -->
        <van-row>
          <van-col span="12" v-for="item in oilList" :key="item.id"
            ><ProductCard :item="item"></ProductCard
          ></van-col>
        </van-row>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import ProductCard from "@/components/ProductCard.vue";
import { getAllProductAPI } from "@/api/product";
export default {
  name: "homePage",
  components: {
    ProductCard,
  },
  data() {
    return {
      activeTab: "",
      images: [
        "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNhbmRsZXN8ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1607713328148-0e55aa0c0772?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNhbmRsZXN8ZW58MHx8MHx8fDA%3D",
      ],
      incenseList: [],
      bodyList: [],
      faceList: [],
      oilList: [],
      logoSrc: require("@/assets/image/25°C-logo-textonly.png"),
    };
  },
  async mounted() {
    const res = await getAllProductAPI();
    const data = res.data;
    // console.log(res);

    this.incenseList = data.filter((ele) => ele.category === "4");
    this.bodyList = data.filter((ele) => ele.category === "2");
    this.faceList = data.filter((ele) => ele.category === "3");
    this.oilList = data.filter((ele) => ele.category === "1");
    // this.$store.commit("cart/getList");
  },
};
</script>

<style lang="less">
.home {
  padding: 0 0 50px 0;
  .van-nav-bar .van-icon {
    color: #18a999;
  }
  .van-swipe__indicator--active {
    background-color: #18a999;
  }
  .van-tabs {
    padding-top: 50px;
    .van-tabs__line {
      width: 25%;
    }
    .van-tab--active {
      color: #18a999;
    }
    .van-nav-bar__title {
      .van-image__img {
        padding-top: 10px;
      }
    }
  }
  .carousell {
    img {
      width: 100vw;
      height: 350px;
      object-fit: cover;
    }
  }
  .title {
    font-size: 22px;
    font-weight: 700;
    padding: 0 20px;
  }
  .content {
    padding: 0 20px;
    font-size: 14px;
  }
}
</style>
