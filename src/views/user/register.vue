<template>
  <div class="register">
    <van-nav-bar title="註冊" left-text="返回" left-arrow />
    <van-form validate-trigger="onBlur" validate-first @submit="submit">
      <van-field
        v-model="form.username"
        name="username"
        placeholder="請輸入帳號，至少5位的數字或英文字母"
        :rules="[
          {
            pattern: /^[0-9a-zA-Z_]{5,}$/,
            message: '帳號需為至少5位的數字或英文字母',
          },
        ]"
      />
      <van-field
        v-model="form.password"
        name="password"
        placeholder="請輸入密碼，至少5位的數字或英文字母"
        :rules="[
          {
            pattern: /^[0-9a-zA-Z_]{5,}$/,
            message: '密碼需為至少5位的數字或英文字母',
          },
        ]"
      />
      <van-field
        v-model="form.email"
        name="email"
        placeholder="請輸入您的電子信箱"
        :rules="[
          {
            pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: '電子信箱格式錯誤',
          },
        ]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
    <p class="text">
      已經有帳號？去 <span @click="$router.push('/login')">登入</span>
    </p>
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
        email: "",
      },
    };
  },
  methods: {
    async submit() {
      this.$toast.loading({
        message: "加載中...",
        forbidClick: true,
        duration: 5000,
      });
      try {
        const res = await registerAPI(this.form);
        console.log(res);
        this.$toast.success(res.message);
        this.$router.push({
          name: "vCode",
          params: { fromRegister: true, email: this.form.email },
        });
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>

<style>
.register {
  .text {
    font-size: 14px;
    text-align: center;
    span {
      border-bottom: 1px solid;
    }
  }
}
.fail-toast {
  max-width: 30%;
}
</style>
