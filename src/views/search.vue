<template>
  <div class="search">
    <!-- 搜尋框 -->
    <van-search
      v-model="keyword"
      placeholder="找商品"
      show-action
      autofocus
      shape="round"
    >
      <template #left>
        <div @click="$router.push('/')"><van-icon name="arrow-left" /></div>
      </template>
      <template #action>
        <div @click="search">搜尋</div>
      </template>
    </van-search>
    <van-divider />
    <div class="search-content">
      <div class="firstLine">
        <p class="title">最近搜尋</p>
        <van-icon name="delete-o" class="clearHistory" @click="clearHistory" />
      </div>
      <div class="history" v-if="searchHistory.length > 0">
        <span
          class="item"
          v-for="(item, index) in searchHistory"
          :key="index"
          @click="searchItem(item)"
          >{{ item }}</span
        >
      </div>
      <span v-else class="text-center">暫無搜尋紀錄</span>
      <p class="title">熱門搜尋</p>
      <span class="item">香氛霧化機</span>
      <span class="item">擴香瓶</span>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "searchPage",
  data() {
    return {
      keyword: "",
    };
  },
  computed: {
    ...mapState("search", ["searchHistory"]),
  },
  mounted() {
    this.$store.dispatch("search/getSearchHistory");
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
        this.$router.push({
          path: "/searchResults",
          query: { keyword: this.keyword },
        });
      }
    },
    searchItem(item) {
      this.searchRecord(item);
      this.$router.push({
        path: "/searchResults",
        query: { keyword: item },
      });
    },
    // 紀錄最近關鍵詞
    searchRecord(keyword) {
      this.$store.commit("search/changeSearchHistory", keyword);
    },
    clearHistory() {
      this.$store.commit("search/clearHistory");
    },
  },
};
</script>

<style lang="less">
.search-content {
  padding-left: 20px;
  .firstLine {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .clearHistory {
    padding-right: 10px;
  }
  .text-center {
    font-size: 14px;
    display: block;
    text-align: center;
    font-weight: 700;
  }
  .title {
    font-size: 16px;
    margin: 20px 0;
  }
  .history {
    display: flex;
    flex-wrap: wrap;
  }
  .item {
    font-size: 14px;
    background-color: #e8e8e8;
    padding: 5px 7px;
    border-radius: 20px;
    margin: 5px 5px;
  }
}
</style>
