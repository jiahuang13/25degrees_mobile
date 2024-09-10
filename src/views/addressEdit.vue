<template>
  <div class="addressEdit">
    <!-- 頂部 nav -->
    <van-nav-bar :title="isAdd ? '新增地址' : '編輯地址'" fixed>
      <template #left>
        <van-icon
          name="arrow-left"
          size="18"
          color="#18a999"
          @click="$router.go(-1)"
        />
      </template>
    </van-nav-bar>
    <div class="form">
      <van-field type="text" v-model="obj.name" placeholder="全名" required />
      <van-field type="tel" v-model="obj.tel" placeholder="手機號碼" required />
      <van-field
        v-model="obj.city"
        is-link
        readonly
        required
        placeholder="城市，區"
        @click="show = true"
      />
      <!-- 地區彈出層 -->
      <van-popup v-model="show" round position="bottom">
        <van-cascader
          v-model="cascaderValue"
          title="請選擇所在地區"
          active-color="#18a999"
          :options="options"
          placeholder="請選擇"
          @close="show = false"
          @finish="onSelect"
        />
      </van-popup>

      <van-field
        type="text"
        v-model="obj.detail"
        required
        placeholder="詳細地址"
      />

      <van-cell center title="設為預設地址">
        <template #right-icon>
          <van-switch v-model="obj.isDefault" size="24" />
        </template>
      </van-cell>

      <div class="btns">
        <van-button type="primary" block round color="#18a999" @click="submit"
          >提交</van-button
        >
        <van-button
          block
          round
          color="#fff"
          class="delete"
          v-if="!isAdd"
          @click="onDelete"
          >刪除</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "addressEdit",
  data() {
    return {
      obj: {
        name: "",
        tel: "",
        address: "",
        isDefault: "",
        city: "",
        detail: "",
      },
      isAdd: false,
      show: false,
      cascaderValue: "",
      options: [
        {
          text: "高雄市",
          value: "330000",
          children: [
            { text: "阿蓮區", value: "330100" },
            { text: "大寮區", value: "330101" },
            { text: "大社區", value: "330102" },
            { text: "大樹區", value: "330103" },
            { text: "鳳山區", value: "330104" },
            { text: "岡山區", value: "330105" },
            { text: "鼓山區", value: "330106" },
            { text: "湖內區", value: "330107" },
            { text: "茄萣區", value: "330108" },
            { text: "甲仙區", value: "330109" },
            { text: "林園區", value: "330110" },
            { text: "苓雅區", value: "330111" },
            { text: "六龜區", value: "330112" },
            { text: "路竹區", value: "330113" },
            { text: "茂林區", value: "330114" },
            { text: "美濃區", value: "330115" },
            { text: "彌陀區", value: "330116" },
            { text: "那瑪夏區", value: "330117" },
            { text: "楠梓區", value: "330118" },
            { text: "內門區", value: "330119" },
            { text: "鳥松區", value: "330120" },
            { text: "旗津區", value: "330121" },
            { text: "旗山區", value: "330122" },
            { text: "前金區", value: "330123" },
            { text: "前鎮區", value: "330124" },
            { text: "橋頭區", value: "330125" },
            { text: "仁武區", value: "330126" },
            { text: "三民區", value: "330127" },
            { text: "杉林區", value: "330128" },
            { text: "桃源區", value: "330129" },
            { text: "田寮區", value: "330130" },
            { text: "小港區", value: "330131" },
            { text: "新興區", value: "330132" },
            { text: "鹽埕區", value: "330133" },
            { text: "燕巢區", value: "330134" },
            { text: "永安區", value: "330135" },
            { text: "梓官區", value: "330136" },
            { text: "左營區", value: "330137" },
          ],
        },
        {
          text: "花蓮縣",
          value: "320000",
          children: [
            { text: "豐濱鄉", value: "320100" },
            { text: "鳳林鎮", value: "320101" },
            { text: "富里鄉", value: "320102" },
            { text: "光復鄉", value: "320103" },
            { text: "花蓮市", value: "320104" },
            { text: "吉安鄉", value: "320105" },
            { text: "瑞穗鄉", value: "320106" },
            { text: "壽豐鄉", value: "320107" },
            { text: "萬榮鄉", value: "320108" },
            { text: "新城鄉", value: "320109" },
            { text: "秀林鄉", value: "320110" },
            { text: "玉里鄉", value: "320111" },
            { text: "卓溪鄉", value: "320112" },
          ],
        },
        {
          text: "基隆市",
          value: "310000",
          children: [
            { text: "安樂區", value: "310100" },
            { text: "暖暖區", value: "310101" },
            { text: "七堵區", value: "310102" },
            { text: "仁愛區", value: "310103" },
            { text: "信義區", value: "310104" },
            { text: "中山區", value: "310105" },
            { text: "中正區", value: "310106" },
          ],
        },
        {
          text: "嘉義市",
          value: "300000",
          children: [
            { text: "東區", value: "300100" },
            { text: "西區", value: "300101" },
          ],
        },
        {
          text: "嘉義縣",
          value: "290000",
          children: [
            { text: "阿里山鄉", value: "290100" },
            { text: "布袋鎮", value: "290101" },
            { text: "大埔鄉", value: "290102" },
            { text: "大林鎮", value: "290103" },
            { text: "東石鄉", value: "290104" },
            { text: "番路鄉", value: "290105" },
            { text: "六腳鄉", value: "290106" },
            { text: "鹿草鄉", value: "290107" },
            { text: "梅山鄉", value: "290108" },
            { text: "民雄鄉", value: "290109" },
            { text: "朴子市", value: "290110" },
            { text: "水上鄉", value: "290111" },
            { text: "太保市", value: "290112" },
            { text: "溪口鄉", value: "290113" },
            { text: "新港鄉", value: "290114" },
            { text: "義竹鄉", value: "290115" },
            { text: "中埔鄉", value: "290116" },
            { text: "竹崎鄉", value: "290117" },
          ],
        },
        {
          text: "金門縣",
          value: "280000",
          children: [
            { text: "金城鎮", value: "280100" },
            { text: "金湖鎮", value: "280101" },
            { text: "金寧鄉", value: "280102" },
            { text: "金沙鎮", value: "280103" },
            { text: "烈嶼鄉", value: "280104" },
            { text: "烏坵鄉", value: "280105" },
          ],
        },
        {
          text: "連江縣",
          value: "270000",
          children: [
            { text: "北竿鄉", value: "270100" },
            { text: "東引鄉", value: "270101" },
            { text: "莒光鄉", value: "270102" },
            { text: "南竿鄉", value: "270103" },
          ],
        },
        {
          text: "苗栗縣",
          value: "260000",
          children: [
            { text: "大湖鄉", value: "260100" },
            { text: "公館鄉", value: "260101" },
            { text: "後龍鎮", value: "260102" },
            { text: "苗栗市", value: "260103" },
            { text: "南庄鄉", value: "260104" },
            { text: "三灣鄉", value: "260105" },
            { text: "三義鄉", value: "260106" },
            { text: "獅潭鄉", value: "260107" },
            { text: "泰安鄉", value: "260108" },
            { text: "通霄鎮", value: "260109" },
            { text: "銅鑼鄉", value: "260110" },
            { text: "頭份市", value: "260111" },
            { text: "頭屋鄉", value: "260112" },
            { text: "西湖鄉", value: "260113" },
            { text: "苑裡鎮", value: "260114" },
            { text: "造橋鄉", value: "260115" },
            { text: "竹南鎮", value: "260116" },
            { text: "卓蘭鎮", value: "260117" },
          ],
        },
        {
          text: "南投縣",
          value: "250000",
          children: [
            { text: "埔里鎮", value: "250100" },
            { text: "草屯鎮", value: "250101" },
            { text: "國姓鄉", value: "250102" },
            { text: "集集鎮", value: "250103" },
            { text: "鹿谷鄉", value: "250104" },
            { text: "名間鄉", value: "250105" },
            { text: "南投市", value: "250106" },
            { text: "仁愛鄉", value: "250107" },
            { text: "水里鄉", value: "250108" },
            { text: "信義鄉", value: "250109" },
            { text: "魚池鄉", value: "250110" },
            { text: "中寮鄉", value: "250111" },
            { text: "竹山鎮", value: "250112" },
          ],
        },
        {
          text: "澎湖縣",
          value: "240000",
          children: [
            { text: "白沙鄉", value: "240100" },
            { text: "湖西鄉", value: "240101" },
            { text: "馬公市", value: "240102" },
            { text: "七美鄉", value: "240103" },
            { text: "望安鄉", value: "240104" },
            { text: "西嶼鄉", value: "240105" },
          ],
        },
        {
          text: "屏東縣",
          value: "230000",
          children: [
            { text: "潮州鎮", value: "230100" },
            { text: "車城鄉", value: "230101" },
            { text: "春日鄉", value: "230102" },
            { text: "東港鎮", value: "230103" },
            { text: "枋寮鄉", value: "230104" },
            { text: "枋山鄉", value: "230105" },
            { text: "高樹鄉", value: "230106" },
            { text: "恆春鎮", value: "230107" },
            { text: "佳冬鄉", value: "230108" },
            { text: "九如鄉", value: "230109" },
            { text: "崁頂鄉", value: "230110" },
            { text: "來義鄉", value: "230111" },
            { text: "里港鄉", value: "230112" },
            { text: "林邊鄉", value: "230113" },
            { text: "麟洛鄉", value: "230114" },
            { text: "琉球鄉", value: "230115" },
            { text: "瑪家鄉", value: "230116" },
            { text: "滿州鄉", value: "230117" },
            { text: "牡丹鄉", value: "230118" },
            { text: "南州鄉", value: "230119" },
            { text: "內埔鄉", value: "230120" },
            { text: "屏東市", value: "230121" },
            { text: "三地門鄉", value: "230122" },
            { text: "獅子鄉", value: "230123" },
            { text: "泰武鄉", value: "230124" },
            { text: "萬丹鄉", value: "230125" },
            { text: "萬巒鄉", value: "230126" },
            { text: "霧台鄉", value: "230127" },
            { text: "新埤鄉", value: "230128" },
            { text: "新園鄉", value: "230129" },
            { text: "鹽埔鄉", value: "230130" },
            { text: "長治鄉", value: "230131" },
            { text: "竹田鄉", value: "230132" },
          ],
        },
        {
          text: "台北市",
          value: "220000",
          children: [
            { text: "大安區", value: "220100" },
            { text: "大同區", value: "220101" },
            { text: "南港區", value: "220102" },
            { text: "內湖區", value: "220103" },
            { text: "士林區", value: "220104" },
            { text: "松山區", value: "220105" },
            { text: "萬華區", value: "220106" },
            { text: "文山區", value: "220107" },
            { text: "信義區", value: "220108" },
            { text: "中山區", value: "220109" },
            { text: "中正區", value: "220110" },
          ],
        },
        {
          text: "台東縣",
          value: "210000",
          children: [
            { text: "卑南鄉", value: "210100" },
            { text: "成功鎮", value: "210101" },
            { text: "池上鄉", value: "210102" },
            { text: "達仁鄉", value: "210103" },
            { text: "大武鄉", value: "210104" },
            { text: "東河鄉", value: "210105" },
            { text: "關山鎮", value: "210106" },
            { text: "海端鄉", value: "210107" },
            { text: "金峰鄉", value: "210108" },
            { text: "蘭嶼鄉", value: "210109" },
            { text: "鹿野鄉", value: "210110" },
            { text: "綠島鄉", value: "210111" },
            { text: "台東市", value: "210112" },
            { text: "太麻里鄉", value: "210113" },
            { text: "延平鄉", value: "210114" },
            { text: "長濱鄉", value: "210115" },
          ],
        },
        {
          text: "台南市",
          value: "200000",
          children: [
            { text: "安定區", value: "200100" },
            { text: "安南區", value: "200101" },
            { text: "安平區", value: "200102" },
            { text: "白河區", value: "200103" },
            { text: "北門區", value: "200104" },
            { text: "北區", value: "200105" },
            { text: "大內區", value: "200106" },
            { text: "東區", value: "200107" },
            { text: "東山區", value: "200108" },
            { text: "官田區", value: "200109" },
            { text: "關廟區", value: "200110" },
            { text: "歸仁區", value: "200111" },
            { text: "後壁區", value: "200112" },
            { text: "佳里區", value: "200113" },
            { text: "將軍區", value: "200114" },
            { text: "柳營區", value: "200115" },
            { text: "六甲區", value: "200116" },
            { text: "龍崎區", value: "200117" },
            { text: "麻豆區", value: "200118" },
            { text: "南化區", value: "200119" },
            { text: "南區", value: "200120" },
            { text: "楠西區", value: "200121" },
            { text: "七股區", value: "200122" },
            { text: "仁德區", value: "200123" },
            { text: "山上區", value: "200124" },
            { text: "善化區", value: "200125" },
            { text: "西港區", value: "200126" },
            { text: "下營區", value: "200127" },
            { text: "新化區", value: "200128" },
            { text: "新市區", value: "200129" },
            { text: "新營區", value: "200130" },
            { text: "學甲區", value: "200131" },
            { text: "鹽水區", value: "200132" },
            { text: "永康區", value: "200133" },
            { text: "玉井區", value: "200134" },
            { text: "中西區", value: "200135" },
            { text: "左鎮區", value: "200136" },
          ],
        },
        {
          text: "台中市",
          value: "230000",
          children: [
            { text: "北區", value: "230100" },
            { text: "車城鄉", value: "230101" },
            { text: "春日鄉", value: "230102" },
            { text: "東港鎮", value: "230103" },
            { text: "枋寮鄉", value: "230104" },
            { text: "枋山鄉", value: "230105" },
            { text: "高樹鄉", value: "230106" },
            { text: "恆春鎮", value: "230107" },
            { text: "佳冬鄉", value: "230108" },
            { text: "九如鄉", value: "230109" },
            { text: "崁頂鄉", value: "230110" },
            { text: "來義鄉", value: "230111" },
            { text: "里港鄉", value: "230112" },
            { text: "林邊鄉", value: "230113" },
            { text: "麟洛鄉", value: "230114" },
            { text: "琉球鄉", value: "230115" },
            { text: "瑪家鄉", value: "230116" },
            { text: "滿州鄉", value: "230117" },
            { text: "牡丹鄉", value: "230118" },
            { text: "南州鄉", value: "230119" },
            { text: "內埔鄉", value: "230120" },
            { text: "屏東市", value: "230121" },
            { text: "三地門鄉", value: "230122" },
            { text: "獅子鄉", value: "230123" },
            { text: "泰武鄉", value: "230124" },
            { text: "萬丹鄉", value: "230125" },
            { text: "萬巒鄉", value: "230126" },
            { text: "霧台鄉", value: "230127" },
            { text: "新埤鄉", value: "230128" },
            { text: "新園鄉", value: "230129" },
            { text: "鹽埔鄉", value: "230130" },
            { text: "長治鄉", value: "230131" },
            { text: "竹田鄉", value: "230132" },
          ],
        },
        {
          text: "新北市",
          value: "320000",
          children: [
            { text: "八里區", value: "320100" },
            { text: "板橋區", value: "320101" },
            { text: "淡水區", value: "320102" },
            { text: "貢寮區", value: "320103" },
            { text: "金山區", value: "320104" },
            { text: "林口區", value: "320105" },
          ],
        },
      ],
    };
  },
  computed: {
    ...mapState("user", ["addressList"]),
  },
  mounted() {
    // 是新增地址
    if (this.$route.path === "/addressAdd") {
      this.isAdd = true;
    } else {
      // 是編輯地址
      this.obj = this.addressList.find(
        (item) => +item.id === +this.$route.params.id
      );
    }
  },
  methods: {
    onSelect({ selectedOptions }) {
      this.show = false;
      this.obj.city = selectedOptions.map((option) => option.text).join(" ");
    },
    submit() {
      console.log(this.obj.isDefault);

      // 拼接地址
      this.obj.address = [
        this.obj.city.replace(/\s/g, ""),
        this.obj.detail,
      ].join("");

      // 判斷是新增地址
      if (this.$route.path === "/addressAdd") {
        this.$store.commit("user/addAddress", this.obj);
      } else {
        // 是編輯地址
        this.$store.commit("user/updateAddress", this.obj);
      }
      this.$router.push("/address");
    },
    onDelete() {
      this.$dialog
        .confirm({
          message: "刪除地址？",
          showCancelButton: true,
          confirmButtonText: "刪除",
        })
        .then(() => {
          // on confirm
          this.$store.commit("user/deleteAddress", this.$route.params.id);
          this.$router.push("/address");
        })
        .catch(() => {});
    },
  },
};
</script>

<style>
.addressEdit {
  background-color: #eaeaea48;
  min-height: 100vh;
  .form {
    padding-top: 60px;
    .van-switch--on {
      background-color: #18a999;
    }
    .btns {
      padding: 150px 5px 0 5px;
      .delete {
        margin-top: 10px;
        color: #18a999 !important;
      }
    }
  }
}
</style>
