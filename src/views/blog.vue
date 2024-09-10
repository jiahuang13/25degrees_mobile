<template>
  <div class="blog">
    <!-- 頂部 nav -->
    <van-nav-bar title="25°C Blog">
      <template #left>
        <van-icon
          name="search"
          size="18"
          @click="$router.push('/searchBlog')"
        />
      </template>
      <template #right>
        <van-icon name="plus" size="18" />
      </template>
    </van-nav-bar>
    <!-- blog列表 -->
    <van-row>
      <van-col span="12" v-for="item in list" :key="item.id"
        ><BlogCard :item="item"></BlogCard
      ></van-col>
    </van-row>
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
    };
  },
  async mounted() {
    const res = await getAllBlogAPI();
    // console.log(res.data.data);
    this.list = res.data.data;
  },
};
</script>

<style lang="less">
.blog {
  padding: 0 0 50px 0;
  .van-nav-bar .van-icon {
    color: #18a999;
  }
  .van-swipe__indicator--active {
    background-color: #18a999;
  }
}
</style>
