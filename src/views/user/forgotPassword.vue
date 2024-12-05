<template>
  <div class="forgotPassword">
    <van-nav-bar
      title="忘記密碼"
      left-text="返回"
      left-arrow
      @click-left="$router.push('/login')"
    />

    <van-form validate-trigger="onBlur" validate-first @submit="sendVCode">
      <van-field
        v-model="form.email"
        name="email"
        placeholder="輸入註冊信箱"
        :rules="[
          {
            pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: '電子信箱格式錯誤',
          },
        ]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >發送驗證碼</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { forgotPasswordAPI } from "@/api/user";

export default {
  name: "forgotPasswordPage",
  data() {
    return {
      form: {
        email: "",
      },
    };
  },
  methods: {
    async sendVCode() {
      this.$toast.loading({
        message: "加載中...",
        forbidClick: true,
        duration: 5000,
      });
      try {
        const res = await forgotPasswordAPI(this.form);
        console.log(res);
        this.$toast.success(res.message);
        this.$router.push({
          name: "vCode",
          params: { fromRegister: false, email: this.form.email },
        });
      } catch (err) {
        console.error(err);
        this.$toast.fail(err.message);
      }
    },
  },
};
</script>

<style>
/* .forgotPassword {
} */
.fail-toast {
  max-width: 30%;
}
</style>
