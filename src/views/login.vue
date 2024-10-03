<template>
  <div class="login">
    <van-nav-bar title="登入">
      <template #left>
        <van-icon
          name="arrow-left"
          size="18"
          color="#18a999"
          @click="$router.push('/home')"
        />
      </template>
    </van-nav-bar>
    <van-form validate-trigger="onBlur" validate-first @submit="submit">
      <van-field
        v-model="form.username"
        name="username"
        placeholder="帳號"
        :rules="[{ validator, message: '請輸入至少5位數字或英文字母' }]"
      />
      <van-field
        v-model="form.password"
        name="password"
        type="password"
        placeholder="密碼"
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
    <div>
      <p class="text">
        還沒有帳號？點我 <span @click="$router.push('/register')">註冊</span>
      </p>
      <p class="text">
        <span @click="$router.push('/register')">忘記密碼</span>
      </p>
    </div>
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
      try {
        const res = await loginAPI(this.form);
        // console.log(res);
        this.$toast.success("登入成功，正在跳轉首頁...");
        console.log(res);

        setToken(res.data.token);
        // 獲取 URL 中的 `redirect` 參數，如果沒有則跳轉到首頁
        const redirect = this.$route.query.redirect || "/home";
        this.$router.push(redirect);
      } catch (err) {
        console.error(err);
      }
    },
    validator(val) {
      return /^[0-9a-zA-Z_]{5,}$/.test(val);
    },
  },
};
</script>

<style>
.login {
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
