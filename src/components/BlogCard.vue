<template>
  <div class="BlogCard">
    <div class="bgc">
      <!-- 圖片 -->
      <van-image
        v-if="item.img"
        width="10rem"
        height="10rem"
        fit="cover"
        :src="item.img"
      />
      <div class="title">{{ item.title }}</div>
    </div>
    <div class="author">
      <van-image
        round
        width="12px"
        height="12px"
        src="https://img01.yzcdn.cn/vant/cat.jpeg"
      />
      <span>{{ item.author }}</span>
      <span class="float-right"
        ><van-icon name="like-o" /> {{ item.likes }}</span
      >
    </div>
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
  padding: 10px 10px;
  width: 10.5rem;
  margin: 5px auto;
  border-radius: 15px;
  .bgc {
    text-align: center;
    background-color: #eeecec;
    padding: 10px;
  }
  .title {
    font-size: 14px;
    text-align: left;
    letter-spacing: 0.5px;
  }
  .author {
    display: flex;
    align-items: center;
    padding-top: 5px;
    span {
      font-size: 12px;
      padding-left: 5px;
      color: #777979;
    }
    .float-right {
      display: block;
      float: right;
      line-height: 12px;
    }
  }
}
</style>
