<template>
  <div class="adminProduct">
    <!-- 搜尋 -->
    <div class="search-container">
      <span class="search-label">商品名稱：</span>
      <el-input
        v-model="search.name"
        clearable
        placeholder="請輸入內容"
        class="search-main"
      />
      <span class="search-label">商品敘述：</span>
      <el-input
        v-model="search.content"
        clearable
        placeholder="請輸入內容"
        class="search-main"
      />
      <span class="search-label">類別：</span>
      <el-select v-model="search.category">
        <el-option
          v-for="item in categoryList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <el-button type="primary" class="search-btn" @click="doSearch"
        >查詢</el-button
      >
    </div>
    <div class="create-container">
      <el-button type="primary" @click="addNewProduct">新增商品</el-button>
      <!-- <el-button @click="delAllCard">批量删除</el-button> -->
    </div>

    <el-scrollbar always>
      <van-loading v-if="loading" type="spinner" size="30px" color="#18A999" />
      <!-- 表格 -->
      <div class="table" v-else>
        <el-table
          style="width: 100%"
          :data="list"
          empty-text="沒有符合資料"
          border
        >
          <el-table-column prop="id" label="ID" align="center">
          </el-table-column>
          <el-table-column
            prop="visible"
            label="前台顯示"
            align="center"
            :formatter="formatVisible"
          >
          </el-table-column>
          <el-table-column prop="thumb" label="縮圖" width="110" align="center">
            <template slot-scope="scope">
              <el-image
                style="width: 80px; height: 80px"
                :src="scope.row.img"
                fit="cover"
              ></el-image>
            </template>
          </el-table-column>
          <el-table-column
            prop="category"
            label="類別"
            :formatter="formatCategory"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="name" label="商品名" align="center">
          </el-table-column>
          <el-table-column prop="price" label="價格" align="center">
          </el-table-column>
          <el-table-column label="商品介紹" width="300">
            <template slot-scope="scope">
              <div class="overflow-hidden" v-html="scope.row.content"></div>
            </template>
          </el-table-column>
          <el-table-column prop="stock" label="庫存" align="center">
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="80" align="center">
            <template #default="scope">
              <div class="action-btn">
                <el-button
                  size="mini"
                  type="text"
                  @click="editProduct(scope.row.id)"
                  >編輯</el-button
                >
                <el-button
                  size="mini"
                  type="text"
                  @click="delProduct(scope.row)"
                  >刪除</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-scrollbar>

    <!-- 編輯對話框 -->
    <el-dialog
      :title="isEdit ? '編輯商品' : '新增商品'"
      :visible.sync="dialog"
      width="70%"
      :before-close="confirmClose"
      center
      top="5vh"
    >
      <el-form
        label-position="right"
        label-width="80px"
        ref="form"
        :model="form"
        :rules="rules"
      >
        <el-form-item label="商品名稱" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="商品價格" prop="price">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="商品介紹" prop="content">
          <quill-editor v-model="form.content"></quill-editor>
        </el-form-item>
        <el-form-item label="圖片連結" prop="img">
          <el-input v-model="form.img"></el-input>
        </el-form-item>
        <el-form-item label="圖片預覽">
          <div class="image">
            <img :src="form.img" alt="" width="300px" height="auto" />
          </div>
        </el-form-item>
        <el-form-item label="庫存量" prop="stock">
          <el-input v-model="form.stock"></el-input>
        </el-form-item>
        <el-form-item label="前台顯示" prop="visible">
          <el-switch
            v-model="form.visible"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="商品類別" prop="category">
          <el-radio-group v-model="form.category">
            <el-radio :label="1">精油</el-radio>
            <el-radio :label="2">身體保養</el-radio>
            <el-radio :label="3">臉部保養</el-radio>
            <el-radio :label="4">香氛</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button
          type="primary"
          @click="isEdit ? updateProduct() : saveNewProduct()"
          >儲 存</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getAllProductAPI,
  getOneProductAPI,
  addNewProductAPI,
  deleteProductAPI,
  updateProductAPI,
  searchProductAPI,
} from "@/api/product";
// 富文本編輯器
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";

export default {
  name: "adminProduct",
  components: {
    quillEditor,
  },
  data() {
    return {
      loading: true,
      list: [], // 商品列表
      // 请求参数
      search: {
        name: "",
        content: "",
        category: null,
      },
      categoryList: [
        {
          id: null,
          name: "全部",
        },
        {
          id: 1,
          name: "精油",
        },
        {
          id: 2,
          name: "身體保養",
        },
        {
          id: 3,
          name: "臉部保養",
        },
        {
          id: 4,
          name: "香氛",
        },
      ],
      isEdit: true,
      dialog: false,
      form: {
        id: null,
        name: "",
        price: "",
        content: "",
        img: "",
        category: 0,
        stock: "",
        visible: 1,
      },
      emptyForm: {
        id: null,
        name: "",
        price: "",
        content: "",
        img: "",
        category: 0,
        stock: "",
        visible: 1,
      },
      rules: {
        name: [{ required: true, message: "必填", trigger: "blur" }],
        content: [{ required: true, message: "必填", trigger: "blur" }],
        price: [
          {
            required: true,
            pattern: /^[1-9]\d*$/,
            message: "請輸入正整數",
            trigger: "blur",
          },
        ],
        img: [
          {
            required: true,
            pattern: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
            message: "請輸入正確URL格式",
            trigger: "blur",
          },
        ],
        stock: [
          {
            required: true,
            pattern: /^[1-9]\d*$/,
            message: "請輸入正整數",
            trigger: "blur",
          },
        ],
        category: [
          {
            required: true,
            pattern: /^[1-4]$/,
            message: "請輸入正整數",
            trigger: "blur",
          },
        ],
      },
    };
  },
  async mounted() {
    await this.getList();
    this.loading = false;
  },
  methods: {
    async getList() {
      const res = await getAllProductAPI();
      console.log(res);
      if (res && !res.error) {
        this.list = res.data;
      }
      // this.total = res.data.length;
    },
    formatCategory(row) {
      const category = this.categoryList.find(
        (item) => item.id === row.category
      );
      return category.name;
    },
    formatVisible(row) {
      return row.visible === 1 ? "是" : "否";
    },
    delProduct(row) {
      this.$confirm(`確定刪除商品 ${row.name} 嗎？`, {
        confirmButtonText: "確定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            const res = await deleteProductAPI(row.id);
            if (res.status === 200) {
              this.getList();
              this.$message({
                type: "success",
                message: "刪除成功",
              });
            }
          } catch (err) {
            console.log(err);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消刪除",
          });
        });
    },
    async editProduct(id) {
      // console.log(id);
      const res = await getOneProductAPI(id);
      console.log(res);

      this.form = res.data;
      this.isEdit = true;
      this.dialog = true;
    },
    updateProduct() {
      this.loading = true;
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          console.log(this.form);

          const result = await updateProductAPI(this.form);
          console.log(result);

          if (result.status === 200) {
            this.dialog = false;
            const res = await getAllProductAPI();
            console.log(res);
            this.list = res.data;
            this.loading = false;
            this.$message.success("編輯成功");
          } else {
            this.$message.error(result.message);
          }
        } else {
          return false;
        }
      });
    },
    addNewProduct() {
      this.isEdit = false;
      this.resetForm();
      this.dialog = true;
    },
    async saveNewProduct() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          console.log(this.form);

          const res = await addNewProductAPI(this.form);
          console.log(res);

          if (res.status === 200) {
            this.resetForm();
            this.dialog = false;
            const res = await getAllProductAPI();
            this.list = res.data;
            // 顯示成功提示
            this.$message.success("新增成功");
          } else {
            this.$message.error(res.message);
          }
        } else {
          return false;
        }
      });
    },
    async doSearch() {
      if (
        this.search.name ||
        this.search.content ||
        this.search.category !== null
      ) {
        const res = await searchProductAPI(this.search);
        // console.log(res);
        if (res.data) {
          this.list = res.data;
        }
      } else {
        return false;
      }
    },
    confirmClose() {
      this.$confirm("編輯還沒儲存，確定離開嗎?", "提示", {
        confirmButtonText: "確定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // this.$refs.form.resetFields(); // 無效
          this.resetForm();
          this.dialog = false;
        })
        .catch(() => {
          return false;
        });
    },
    resetForm() {
      this.form = { ...this.emptyForm };
    },
  },
};
</script>

<style lang="scss">
.adminProduct {
  padding: 20px;
  background-color: #fff;
  width: 100%;
  .van-loading {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
  }
  .el-scrollbar {
    padding-top: 10px;
    height: 70vh;
    // z-index: 10000;
    // width: 100%;
  }
  .search-container {
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgb(237, 237, 237, 0.9);
    padding-bottom: 10px;
    .search-label {
      font-size: 14px;
    }
    .search-main {
      width: 15%;
      // height: 30px;
      margin-right: 10px;
    }
    .search-btn {
      margin-left: 20px;
    }
  }
  .page-container {
    padding: 4px 0px;
    text-align: right;
  }
  .form-container {
    padding: 0px 80px;
  }
  .create-container {
    padding: 10px 0px;
  }
  .overflow-hidden {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    p {
      margin: 0;
    }
  }
  .el-table .cell {
    display: flex;
    justify-content: center;
    align-items: center;
    // height: 100%; /* 確保容器高度填滿 */
  }

  .action-btn {
    display: flex;
    flex-direction: column;
    .el-button {
      margin-left: 0;
    }
  }
}
</style>
