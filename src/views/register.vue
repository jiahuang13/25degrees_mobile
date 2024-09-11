<template>
  <div class="register">
    <van-nav-bar title="註冊" left-text="返回" left-arrow />
    <van-form validate-trigger="onBlur" validate-first @submit="submit">
      <van-field
        v-model="form.username"
        name="username"
        placeholder="請輸入帳號"
        :rules="[{ validator, message: '帳號需為至少5位數字或英文字母' }]"
      />
      <van-field
        v-model="form.password"
        name="password"
        placeholder="請輸入密碼"
        :rules="[{ validator, message: '密碼需為至少5位數字或英文字母' }]"
      />
      <div style="margin: 16px">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          @submit="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { registerAPI } from "@/api/user";

export default {
  name: "registerPage",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async submit() {
      const res = await registerAPI(this.form);
      if (res.data.status === 0) {
        this.$toast.success("註冊成功，自動跳轉登入頁面");
      } else {
        this.$toast.fail(res.data.message);
      }
    },
    validator(val) {
      return /^[0-9a-zA-Z_]{5,}$/.test(val);
    },
  },
};
</script>

<style>
.fail-toast {
  max-width: 30%;
}
</style>
