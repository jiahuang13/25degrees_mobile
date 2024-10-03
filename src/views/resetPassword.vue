<template>
  <div class="resetPassword">
    <van-nav-bar title="設定新密碼">
      <template #left>
        <van-icon
          name="arrow-left"
          size="18"
          color="#18a999"
          @click="$router.push('/login')"
        />
      </template>
    </van-nav-bar>
    <van-form validate-trigger="onBlur" validate-first @submit="submit">
      <van-field
        v-model="form.password"
        name="password"
        type="password"
        placeholder="輸入新密碼"
        :rules="[{ validator, message: '請輸入至少5位數字或英文字母' }]"
      />
      <van-field
        v-model="form.confirmPassword"
        name="confirmPassword"
        type="password"
        placeholder="再次輸入新密碼"
        :rules="[{ validator, message: '請輸入至少5位數字或英文字母' }]"
      />
      <div style="margin: 16px">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          :disabled="
            form.password === '' ||
            form.confirmPassword === '' ||
            form.password !== form.confirmPassword
          "
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { resetPasswordAPI } from "@/api/user";

export default {
  name: "resetPassword",
  data() {
    return {
      form: {
        password: "",
        confirmPassword: "",
      },
    };
  },
  methods: {
    async submit() {
      try {
        const obj = {
          email: this.$route.params.email,
          password: this.form.password,
        };

        const res = await resetPasswordAPI(obj);
        console.log(res);
        this.$toast.success(res.message);
        this.$router.push("/login");
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
.resetPassword {
  /* text-align: center; */
  .flex {
    margin: 0 auto;
    max-width: 500px;
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    .text {
      font-size: 14px;
      text-align: center;
      span {
        border-bottom: 1px solid;
        cursor: pointer;
      }
    }
  }
  .van-form {
    max-width: 560px;
    margin: 0 auto;
  }
}
.fail-toast {
  max-width: 30%;
}
</style>
