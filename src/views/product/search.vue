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
        <van-button
          type="default"
          @click="search(keyword)"
          :disabled="keyword.trim() === ''"
          >搜尋</van-button
        >
      </template>
    </van-search>
    <van-divider />
    <div class="search-content">
      <div class="firstLine">
        <p class="title">最近搜尋</p>
        <van-icon name="delete-o" class="clearHistory" @click="clearHistory" />
      </div>
      <div class="history" v-if="history">
        <span
          class="item"
          v-for="(item, index) in history"
          :key="index"
          @click="search(item)"
          >{{ item }}</span
        >
      </div>
      <span v-else class="text-center">暫無搜尋紀錄</span>
      <p class="title">熱門搜尋</p>
      <span
        class="item"
        v-for="(item, index) in trendList"
        :key="index"
        @click="search(item)"
        >{{ item }}</span
      >
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
      trendList: ["香氛霧化機", "擴香瓶"],
    };
  },
  computed: {
    ...mapState("search", ["history"]),
  },
  mounted() {
    this.$store.commit("search/getHistory");
  },
  methods: {
    search(item) {
      this.$store.commit("search/addHistory", item);
      this.$router.push({
        path: "/searchResults",
        query: { keyword: item },
      });
    },
    clearHistory() {
      localStorage.removeItem("25degrees_search");
      this.$store.commit("search/getHistory");
    },
  },
};
</script>

<style lang="less">
.search {
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
}
</style>
