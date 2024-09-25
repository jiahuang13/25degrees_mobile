<template>
  <div class="address">
    <!-- 頂部 nav -->
    <van-nav-bar title="我的地址" fixed>
      <template #left>
        <van-icon
          name="arrow-left"
          size="18"
          color="#18a999"
          @click="checkOutSelect ? $router.go(-1) : $router.push('/setting')"
        />
      </template>
    </van-nav-bar>
    <div class="list">
      <van-cell-group>
        <van-cell
          v-for="item in addressList"
          :key="item.id"
          clickable
          center
          @click="select(item)"
        >
          <template #title>
            <div>
              {{ item.recipient_name }} {{ item.phone }}
              <van-tag type="danger" v-if="item.is_default === 1">預設</van-tag>
            </div>
          </template>
          <template #right-icon>
            <van-icon
              v-if="!$route.query.select"
              name="edit"
              @click.stop="edit(item.id)"
            />
          </template>
          <template #label>
            <div>{{ item.address }}</div>
          </template>
        </van-cell>
      </van-cell-group>
      <van-button
        block
        round
        class="addButton"
        @click="$router.push('/addressAdd')"
        >新增地址</van-button
      >
    </div>
    <div class="empty" v-if="addressList.length == 0">目前沒有地址</div>
  </div>
</template>

<script>
import { getAddressListAPI } from "@/api/user";
export default {
  name: "addressPage",
  data() {
    return {
      defaultOne: "0",
      //結帳頁面跳過來選擇
      checkOutSelect: false,
      addressList: [],
    };
  },
  methods: {
    edit(id) {
      this.$router.push(`/addressEdit/${id}`);
      // console.log(item);
    },
    select(item) {
      if (this.checkOutSelect) {
        // console.log(item.id);
        this.$router.push({
          name: "checkOut",
          params: { selectedId: item.id },
        });
      }
    },
  },
  async mounted() {
    // console.log("Route params:", this.$route.params);
    this.checkOutSelect = this.$route.query.select || false;
    // 獲取所有地址
    try {
      const res = await getAddressListAPI();
      // console.log(res);
      this.addressList = res.data;
    } catch (err) {
      console.log("獲取地址列表錯誤:", err);
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
  .list {
    padding-top: 50px;
    .van-tag--danger {
      background-color: #18a999;
    }
  }
  .addButton {
    position: fixed;
    bottom: 5px; /* 固定在視窗底部 */
    left: 50%; /* 將按鈕的左邊對齊到視窗中間 */
    transform: translateX(-50%); /* 將按鈕的中心移到正中間 */
    width: 95%; /* 使按鈕寬度為整個視窗寬度 */
    z-index: 1000; /* 確保按鈕不會被其他元素遮蓋 */
    box-sizing: border-box;
    background-color: #18a999;
    color: #fff;
  }
}
</style>
