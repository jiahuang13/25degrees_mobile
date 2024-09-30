<template>
  <div class="blog">
    <!-- 頂部 nav -->
    <van-nav-bar title="25°C Blog">
      <template #left>
        <van-icon name="arrow-left" size="18" @click="$router.go(-1)" />
      </template>
      <template #right>
        <van-icon name="plus" size="18" />
      </template>
    </van-nav-bar>

    <van-loading v-if="loading" type="spinner" size="30px" color="#18A999" />

    <!-- blog列表 -->
    <div v-else>
      <van-row>
        <van-col span="24" v-for="item in list" :key="item.id"
          ><BlogCard :item="item"></BlogCard
        ></van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import BlogCard from "@/components/BlogCard.vue";
import { getAllBlogAPI } from "@/api/blog.js";
export default {
  name: "blogPage",
  components: {
    BlogCard,
  },
  data() {
    return {
      list: [],
      loading: true,
    };
  },
  async mounted() {
    await this.getBlog();
    this.loading = false;
  },
  beforeRouteUpdate(to, from, next) {
    // 當路由發生更新時（如 /blog/:id 切換）
    if (to.params.id !== from.params.id) {
      this.getBlog(); // 更新文章數據
    }
    next(); // 確保導航繼續進行
  },
  methods: {
    async getBlog() {
      const res = await getAllBlogAPI();
      if (res && !res.error) {
        console.log(res);
        this.list = res.data;
      }
    },
  },
};
</script>

<style lang="less">
.blog {
  margin-bottom: 70px;
  .van-loading {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
  }
  .van-nav-bar .van-icon {
    color: #18a999;
  }
  .van-swipe__indicator--active {
    background-color: #18a999;
  }
}
</style>
