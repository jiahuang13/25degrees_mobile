<template>
  <div class="search-results">
    <!-- 搜尋框 -->
    <van-search
      v-model="keyword"
      placeholder="找商品"
      show-action
      autofocus
      shape="round"
    >
      <template #left>
        <div @click="$router.push('/search')">
          <van-icon name="arrow-left" />
        </div>
      </template>
      <template #action>
        <van-button
          type="default"
          @click="search"
          :disabled="keyword.trim() === ''"
          >搜尋</van-button
        >
      </template>
    </van-search>

    <van-loading v-if="loading" type="spinner" size="30px" color="#18A999" />

    <div v-else>
      <div v-if="list.length > 0 || false">
        <van-divider>搜尋結果共{{ list.length || 0 }}項商品</van-divider>
        <!-- 商品列表 -->
        <van-row>
          <van-col span="12" v-for="item in list" :key="item.id"
            ><ProductCard :item="item"></ProductCard
          ></van-col>
        </van-row>
      </div>
      <span v-else class="text-center">暫無搜尋結果</span>
      <van-divider>看看其他</van-divider>
    </div>
    <!-- 商品列表 -->
    <van-row>
      <van-col span="12" v-for="item in suggestList" :key="item.id"
        ><ProductCard :item="item"></ProductCard
      ></van-col>
    </van-row>
  </div>
</template>

<script>
import { getAllProductRandAPI, searchProductAPI } from "@/api/product";
import ProductCard from "@/components/ProductCard.vue";
export default {
  name: "searchResults",
  components: {
    ProductCard,
  },
  data() {
    return {
      keyword: "",
      list: [],
      suggestList: [],
      loading: true,
    };
  },
  async mounted() {
    this.keyword = this.$route.query.keyword;
    await this.getList();
    await this.getSuggestList();
  },
  methods: {
    search() {
      this.$store.commit("search/addHistory", this.keyword);
      this.$router.push({
        path: "/searchResults",
        query: { keyword: this.keyword },
      });
    },
    async getList() {
      const res = await searchProductAPI({
        name: this.$route.query.keyword,
        content: this.$route.query.keyword,
      });
      console.log(res);
      this.list = res.data || [];
      this.loading = false;
    },
    async getSuggestList() {
      try {
        const res = await getAllProductRandAPI();
        console.log(res);
        this.suggestList = res.data;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="less">
.search-results {
  .text-center {
    display: block;
    text-align: center;
  }
  .van-search {
    .van-button {
      padding: 0;
      border-color: transparent;
      background-color: #fff;
    }
  }
  .van-search__action:active {
    background-color: #fff;
  }
  .van-loading {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
  }
}
</style>
