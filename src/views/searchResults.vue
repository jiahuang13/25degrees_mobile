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
        <div @click="search">搜尋</div>
      </template>
    </van-search>
    <van-divider />
    <!-- 商品列表 -->
    <van-row v-if="list.length > 0">
      <van-col span="12" v-for="item in list" :key="item.id"
        ><ProductCard :item="item"></ProductCard
      ></van-col>
    </van-row>
    <span v-else class="text-center">暫無搜尋結果</span>
  </div>
</template>

<script>
import ProductCard from "@/components/ProductCard.vue";
import { getSearchResultsAPI } from "@/api/product.js";
export default {
  name: "searchResults",
  components: {
    ProductCard,
  },
  data() {
    return {
      keyword: "",
      list: [],
    };
  },
  watch: {
    $route() {
      console.log("hi");
      this.getSearchResults();
    },
  },
  mounted() {
    // console.log(this.$route.query.keyword);
    this.keyword = this.$route.query.keyword;
    this.$store.dispatch("search/getSearchHistory");
    this.getSearchResults();
  },
  methods: {
    search() {
      if (this.keyword.trim() === "") {
        this.$toast({
          message: "搜尋不能為空",
          position: "top",
        });
      } else {
        this.searchRecord(this.keyword);
        this.$router.push(
          {
            path: "/searchResults",
            query: { keyword: this.keyword },
          },
          () => {},
          { ignore: true }
        );
      }
    },
    // 紀錄最近關鍵詞
    searchRecord(keyword) {
      this.$store.commit("search/changeSearchHistory", keyword);
    },
    async getSearchResults() {
      const res = await getSearchResultsAPI({
        name: this.$route.query.keyword,
        order: "price",
      });
      if (res.data.status === 0) {
        this.list = res.data.data;
      } else {
        this.list = [];
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
}
</style>
