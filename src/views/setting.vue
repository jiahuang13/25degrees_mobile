<template>
  <div class="setting">
    <!-- 頂部 nav -->
    <van-nav-bar title="設定" fixed>
      <template #left>
        <van-icon
          name="arrow-left"
          size="18"
          color="#18a999"
          @click="$router.push('/user')"
        />
      </template>
      <template #right>
        <van-icon name="chat-o" dot color="#18a999" size="18" />
      </template>
    </van-nav-bar>
    <!-- cell group -->
    <div class="cell-group">
      <van-cell-group title="我的帳戶">
        <van-cell title="我的檔案" is-link />
        <van-cell title="我的地址" is-link @click="$router.push('/address')" />
        <van-cell title="銀行/信用卡" is-link />
      </van-cell-group>
      <van-cell-group title="分组2">
        <van-cell title="单元格" value="内容" />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  name: "settingPage",
};
</script>

<style>
.setting {
  background-color: #eaeaea48;
  min-height: 100vh;
  .cell-group {
    padding-top: 40px;
  }
}
</style>
