<template>
  <div class="login">
    <van-nav-bar title="登入" left-text="返回" left-arrow />
    <van-form validate-trigger="onBlur" validate-first @submit="submit">
      <van-field
        v-model="form.username"
        name="username"
        placeholder="請輸入帳號"
        :rules="[{ validator, message: '請輸入至少5位數字或英文字母' }]"
      />
      <van-field
        v-model="form.password"
        name="password"
        placeholder="請輸入密碼"
        :rules="[{ validator, message: '請輸入至少5位數字或英文字母' }]"
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
import { loginAPI } from "@/api/user";
import { setToken } from "@/utils/auth";

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
      const res = await loginAPI(this.form);
      console.log(res);
      if (res.data.status === 0) {
        this.$toast.success("登入成功，正在跳轉...");
        setToken(res.token);
        this.$router.push("/");
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
