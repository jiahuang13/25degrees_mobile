<template>
  <div class="blogDetail">
    <van-loading v-if="loading" type="spinner" size="30px" color="#18A999" />

    <div v-else>
      <div class="container">
        <!-- 頂部 nav -->
        <van-nav-bar fixed :border="false">
          <template #left>
            <van-icon
              name="arrow-left"
              size="18"
              @click="$router.push('/blog')"
            />
          </template>
        </van-nav-bar>

        <div class="title">
          {{ blog.title }}
        </div>
        <div class="date">
          <van-icon name="clock-o" /> {{ blog.formattedDate }}
        </div>
        <div class="sns">
          <div
            v-for="(item, index) in sns"
            :key="index"
            @click="share(item.name)"
          >
            <van-image width="2rem" height="2rem" :src="item.img" />
          </div>
        </div>
      </div>
      <div class="content">
        <div class="image">
          <van-image width="100%" height="50%" fit="cover" :src="blog.img" />
        </div>
        <div v-html="blog.content"></div>
      </div>
      <div class="readmore">
        <div class="strong">延伸閱讀</div>
        <div class="title" v-for="item in readmoreList" :key="item.id">
          <p @click="$router.push(`/blog/${item.id}`)">
            {{ item.title }} <van-icon name="down" />
          </p>
        </div>
        <p class="center" @click="$router.push('/blog')">看更多</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getOneBlogAPI, getThreeRandBlogAPI } from "@/api/blog";
export default {
  name: "blogDetail",

  data() {
    return {
      loading: true,
      blog: {
        title: "",
        content: "",
        formattedDate: "",
        img: "",
      },
      sns: [
        { name: "link", img: require("@/assets/image/link.png") },
        { name: "facebook", img: require("@/assets/image/facebook.png") },
        { name: "line", img: require("@/assets/image/line.png") },
      ],
      readmoreList: [],
      blogUrl: window.location.href, // 直接取得當前頁面的完整 URL
      blogTitle: document.title, // 取得當前頁面的標題（選擇性）
    };
  },
  async mounted() {
    await this.getBlog();
    await this.getThreeRandBlog();
    this.loading = false;
  },
  beforeRouteUpdate(to, from, next) {
    next(); // 確保導航繼續進行
    if (to.params.id !== from.params.id) {
      this.getBlog(); // 更新文章數據
    }
    console.log(from.params.id, to.params.id);
  },
  methods: {
    async getBlog() {
      const id = this.$route.params.id;
      const res = await getOneBlogAPI(id);
      // const res2 = await getThreeRandBlogAPI();
      if (res && !res.error) {
        console.log(res);
        const { title, content, created_at, img } = res.data;
        const date = new Date(created_at);
        const formattedDate = date.toISOString().substring(0, 10);

        this.blog = { ...this.blog, title, content, formattedDate, img };
      } else {
        console.log(res.error);
      }
    },
    async getThreeRandBlog() {
      const res = await getThreeRandBlogAPI(this.$route.params.id);
      console.log(res);
      if (res && !res.error) {
        this.readmoreList = res.data;
      } else {
        console.log(res.error);
      }
    },
    share(platform) {
      const url = encodeURIComponent(this.blogUrl); // 將 URL 編碼
      // const title = encodeURIComponent(this.blogTitle);
      let shareUrl = "";

      switch (platform) {
        case "facebook":
          // Facebook 分享
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
          window.open(shareUrl, "_blank");
          break;
        case "line":
          // Line 分享
          shareUrl = `https://social-plugins.line.me/lineit/share?url=${url}`;
          window.open(shareUrl, "_blank");
          break;
        case "link":
          // 複製當前文章網址
          this.copyLink(this.blogUrl);
          break;
        default:
          return;
      }
    },
    // 複製到剪貼板方法
    async copyLink(text) {
      try {
        await navigator.clipboard.writeText(text);
        this.$toast.success("已複製到剪貼板"); // 成功提示
      } catch (err) {
        console.error("複製失敗：", err);
        this.$toast.fail("複製失敗，請手動選取文字複製！");
      }
    },
  },
};
</script>

<style>
.blogDetail {
  height: 100%;
  .van-loading {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
  }
  .container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background-color: #18a998;
    height: 50vh;
    text-align: center;
    .van-nav-bar {
      background-color: transparent;
      .van-icon {
        color: #fff;
      }
    }
    .title {
      font-size: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding-top: 15vh;
      width: 60vw;
      color: #fff;
      line-height: 38px;
      letter-spacing: 1px;
      .van-icon {
        padding-right: 5px;
      }
    }
    .date {
      color: #ffffff82;
      font-size: 14px;
    }
    .sns {
      display: flex;
      padding-bottom: 20px;
      .van-image {
        padding: 0 7px;
      }
    }
  }
  .content {
    /* padding: 30px 0; */
    width: 80vw;
    margin: 30px auto;
    padding-bottom: 30px;
    letter-spacing: 2px;
    color: #878787;
    font-size: 14px;
    .image {
      text-align: center;
      padding: 10px 0;
      width: 100%;
    }
  }
  .readmore {
    padding-bottom: 50px;
    margin: 30px auto;
    width: 80vw;
    font-size: 20px;
    color: #878787;
    letter-spacing: 2px;
    .strong {
      font-weight: bold;
    }
    .title {
      font-size: 16px;
      letter-spacing: 2px;
      border-bottom: 1px solid #878787;
      .van-icon {
        transform: rotate(-90deg);
      }
    }
    p.center {
      font-size: 14px;
      text-align: center;
    }
  }
}
</style>
