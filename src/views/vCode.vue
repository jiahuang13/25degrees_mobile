<template>
  <div class="vCode">
    <van-nav-bar
      title="提交驗證碼"
      left-text="返回"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <!-- 驗證碼輸入框 -->
    <van-password-input
      :value="vCode"
      :mask="false"
      :focused="showKeyboard"
      @focus="showKeyboard = true"
      info="請輸入信箱收到的6位驗證碼"
    />
    <!-- 数字键盘 -->
    <van-number-keyboard
      v-model="vCode"
      :show="showKeyboard"
      @blur="showKeyboard = false"
    />
    <!-- 回註冊業
    <p class="text">
      點我回 <span @click="$router.push('/register')">註冊</span> 頁
    </p> -->
  </div>
</template>

<script>
import { vCodeRegisterAPI, vCodeForgotPasswordAPI } from "@/api/user";
export default {
  data() {
    return {
      vCode: "",
      showKeyboard: true,
    };
  },
  watch: {
    vCode(newVal) {
      // 當驗證碼長度達到 6 位時，執行自動提交
      if (newVal.length === 6) {
        this.submit();
        // console.log("submit");
      }
    },
  },
  methods: {
    async submit() {
      const email = this.$route.params.email;
      const obj = { email, vCode: this.vCode };
      console.log(obj);

      // 註冊驗證
      if (this.$route.params.fromRegister) {
        try {
          const res = await vCodeRegisterAPI(obj);
          console.log(res);

          this.$toast.success(res.message);
          this.$router.push("/login");
        } catch (err) {
          console.error(err);
          if (err.response.data.message === "驗證碼已過期或無效，請重新註冊") {
            this.$router.push("/register");
          }
        }
      } else {
        // 忘記密碼驗證
        try {
          const res = await vCodeForgotPasswordAPI(obj);
          console.log(res);
          this.$router.push({ name: "resetPassword", params: { email } });
        } catch (err) {
          console.log(err);
        }
      }
    },
  },
};
</script>

<style>
.vCode {
  .text {
    font-size: 14px;
    text-align: center;
    span {
      border-bottom: 1px solid;
    }
  }
}
</style>
