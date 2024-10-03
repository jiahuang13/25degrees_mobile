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

    <van-loading v-if="loading" type="spinner" size="30px" color="#18A999" />

    <div v-else>
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
                <van-tag type="danger" v-if="item.is_default === 1"
                  >預設</van-tag
                >
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
        <van-button block round class="addButton" @click="addressAdd"
          >新增地址</van-button
        >
      </div>
      <van-empty description="目前沒有地址" v-if="addressList.length == 0" />
    </div>
  </div>
</template>

<script>
import { getAddressListAPI } from "@/api/address";
export default {
  name: "addressPage",
  data() {
    return {
      loading: true,
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
    async getAddressList() {
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
    addressAdd() {
      if (this.addressList.length === 0) {
        this.$router.push({ name: "addressAdd", params: { is_default: true } });
      }
      this.$router.push({ name: "addressAdd", params: { is_default: false } });
    },
  },
  async mounted() {
    await this.getAddressList();
    this.loading = false;
  },
};
</script>

<style>
.address {
  background-color: #eaeaea48;
  min-height: 100vh;
  .empty {
    padding-top: 40px;
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
.van-loading {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}
.van-empty {
  padding-top: 20vh;
}
</style>
