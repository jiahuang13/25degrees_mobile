<template>
  <div class="verificationCode">
    <van-nav-bar title="提交驗證碼" left-text="返回" left-arrow />
    <!-- 驗證碼輸入框 -->
    <van-password-input
      :value="verificationCode"
      :mask="false"
      :focused="showKeyboard"
      @focus="showKeyboard = true"
      info="請輸入信箱收到的6位驗證碼"
    />
    <!-- 数字键盘 -->
    <van-number-keyboard
      v-model="verificationCode"
      :show="showKeyboard"
      @blur="showKeyboard = false"
    />
    <!-- 回註冊業 -->
    <p class="text">
      點我回 <span @click="$router.push('/register')">註冊</span> 頁
    </p>
  </div>
</template>

<script>
import { verificationCodeAPI } from "@/api/user";
export default {
  data() {
    return {
      verificationCode: "",
      showKeyboard: true,
    };
  },
  watch: {
    verificationCode(newVal) {
      // 當驗證碼長度達到 6 位時，執行自動提交
      if (newVal.length === 6) {
        this.submit();
        // console.log("submit");
      }
    },
  },
  methods: {
    async submit() {
      const email = localStorage.getItem("userEmail");
      const data = { email, verificationCode: this.verificationCode };

      const res = await verificationCodeAPI(data);
      console.log(res);

      if (res.data.status === 200) {
        this.$toast.success(res.data.message);
        this.$router.push("/login");
      } else {
        this.$toast.fail(res.data.message);
      }
    },
  },
};
</script>

<style>
.verificationCode {
  .text {
    font-size: 14px;
    text-align: center;
    span {
      border-bottom: 1px solid;
    }
  }
}
</style>
