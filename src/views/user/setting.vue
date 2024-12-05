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
      <van-cell-group>
        <van-cell title="登出" @click="logout" />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { removeToken } from "@/utils/auth";
export default {
  name: "settingPage",
  methods: {
    logout() {
      this.$dialog
        .confirm({
          message: "確認登出嗎？",
          confirmButtonText: "確定",
          cancelButtonText: "取消",
        })
        .then(() => {
          removeToken();
          this.$toast.success("登出成功");
          this.$router.push("/home");
        })
        .catch(() => {
          console.log("取消登出");
        });
    },
  },
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
