<template>
  <div class="address">
    <!-- 頂部 nav -->
    <van-nav-bar title="我的地址" fixed>
      <template #left>
        <van-icon
          name="arrow-left"
          size="18"
          color="#18a999"
          @click="selectType ? $router.go(-1) : $router.push('/setting')"
        />
      </template>
    </van-nav-bar>
    <div class="list">
      <van-address-list
        switchable
        v-model="defaultOne"
        :list="addressList"
        default-tag-text="預設"
        @select="select"
        @edit="edit"
        @add="$router.push('/addressAdd')"
      />
    </div>
    <div class="empty" v-if="addressList.length == 0">目前沒有地址</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "addressPage",
  data() {
    return {
      defaultOne: "0",
      selectType: false,
    };
  },
  computed: {
    ...mapState("user", ["addressList"]),
  },
  methods: {
    edit(item) {
      this.$router.push(`/addressEdit/${item.id}`);
      // console.log(item);
    },
    select(item) {
      if (this.selectType) {
        this.$store.commit("user/updateAddress", item);
        setTimeout(() => {
          this.$router.push("/checkOut");
        }, 1000);
      }
    },
  },
  mounted() {
    if (this.$route.query.type) {
      this.selectType = true;
    }
  },
};
</script>

<style>
.address {
  background-color: #eaeaea48;
  min-height: 100vh;
  .empty {
    text-align: center;
    color: gray;
    font-size: 14px;
  }
  .van-address-list {
    padding-top: 60px;
    .van-button--danger,
    .van-tag--danger,
    .van-address-item .van-radio__icon--checked .van-icon {
      background-color: #18a999;
      border-color: #18a999;
    }
    .van-address-list__bottom {
      background-color: transparent;
    }
  }
}
</style>
