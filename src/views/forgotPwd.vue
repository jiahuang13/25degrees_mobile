<template>
  <div class="forgotPwd">
    <van-nav-bar title="忘記密碼" left-text="返回" left-arrow />
    <van-form validate-trigger="onBlur" validate-first @submit="submit">
      <van-field
        v-model="email"
        name="email"
        placeholder="輸入註冊信箱"
        :rules="[
          {
            pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: '請輸入有效的電子信箱',
          },
        ]"
      />
      <div style="margin: 16px">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          @submit="submit"
          >發送驗證碼</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { forgotPwdAPI } from "@/api/user";

export default {
  name: "forgotPwdPage",
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
      try {
        const res = await forgotPwdAPI(this.form);
        console.log(res);
        this.$toast.success(res.message);
        localStorage.setItem("userEmail", this.form.email);
        this.$router.push("/vCode");
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>

<style>
.forgotPwd {
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
