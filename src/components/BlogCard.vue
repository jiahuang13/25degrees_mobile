<template>
  <div class="BlogCard" @click="$router.push(`/blog/${item.id}`)">
    <!-- 圖片 -->
    <van-image v-if="item.img" fit="cover" :src="item.img" />
    <div class="title">{{ item.title }} <van-icon name="down" /></div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
.BlogCard {
  padding: 10px 0 30px 0;
  width: 90%;
  margin: 5px auto;
  text-align: center;
  border-radius: 15px;
  .van-image {
    height: 60vw;
    width: 80vw;
  }
  .title {
    font-size: 20px;
    text-align: left;
    /* letter-spacing: 0.5px; */
    padding-top: 10px;
    width: 80vw;
    margin: 0 auto;
    letter-spacing: 2px;

    .van-icon {
      transform: rotate(-90deg);
    }
  }
}
</style>
