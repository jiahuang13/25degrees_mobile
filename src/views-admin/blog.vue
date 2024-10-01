<template>
  <div class="adminBlog">
    <!-- 搜尋 -->
    <div class="search-container">
      <span class="search-label">標題：</span>
      <el-input
        v-model="search.title"
        clearable
        placeholder="請輸入內容"
        class="search-main"
      />
      <span class="search-label">內文：</span>
      <el-input
        v-model="search.content"
        clearable
        placeholder="請輸入內容"
        class="search-main"
      />
      <el-button type="primary" class="search-btn" @click="doSearch"
        >查詢</el-button
      >
    </div>
    <div class="create-container">
      <el-button type="primary" @click="addNewBlog">新增文章</el-button>
      <div class="total">共 {{ total }} 篇</div>
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
          <el-table-column prop="id" label="ID" align="center" width="80">
          </el-table-column>
          <el-table-column
            prop="visible"
            label="前台顯示"
            align="center"
            :formatter="formatVisible"
            width="50"
          >
          </el-table-column>
          <el-table-column prop="img" label="縮圖" width="110" align="center">
            <template slot-scope="scope">
              <el-image
                style="width: 80px; height: 80px"
                :src="scope.row.img"
                fit="cover"
              ></el-image>
            </template>
          </el-table-column>
          <el-table-column prop="title" label="標題" width="150" align="center">
          </el-table-column>
          <el-table-column label="文章介紹">
            <template slot-scope="scope">
              <div class="overflow-hidden" v-html="scope.row.content"></div>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="80" align="center">
            <template #default="scope">
              <div class="action-btn">
                <el-button
                  size="mini"
                  type="text"
                  @click="editBlog(scope.row.id)"
                  >編輯</el-button
                >
                <el-button size="mini" type="text" @click="delBlog(scope.row)"
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
      :title="isEdit ? '編輯文章' : '新增文章'"
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
        <el-form-item label="標題" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="文章內文" prop="content">
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
        <el-form-item label="前台顯示" prop="visible">
          <el-switch
            v-model="form.visible"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="isEdit ? updateBlog() : saveNewBlog()"
          >儲 存</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getAllBlogAPI,
  deleteBlogAPI,
  getOneBlogAPI,
  updateBlogAPI,
  addNewBlogAPI,
  searchBlogAPI,
} from "@/api/blog";
// 富文本編輯器
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";

export default {
  name: "adminBlog",
  components: {
    quillEditor,
  },
  data() {
    return {
      loading: true,
      list: [], // 文章列表
      total: 0,
      // 请求参数
      search: {
        title: "",
        content: "",
      },
      isEdit: true,
      dialog: false,
      form: {
        id: null,
        title: "",
        content: "",
        img: "",
        visible: 1,
      },
      emptyForm: {
        id: null,
        title: "",
        content: "",
        img: "",
        visible: 1,
      },
      rules: {
        title: [{ required: true, message: "必填", trigger: "blur" }],
        content: [{ required: true, message: "必填", trigger: "blur" }],
        img: [
          {
            required: true,
            pattern: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
            message: "請輸入正確URL格式",
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
      const res = await getAllBlogAPI();
      console.log(res);
      if (res && !res.error) {
        this.list = res.data;
        this.total = res.data.length;
      }
      // this.total = res.data.length;
    },
    formatVisible(row) {
      return row.visible === 1 ? "是" : "否";
    },
    delBlog(row) {
      this.$confirm(`確定刪除文章 ${row.title} 嗎？`, {
        confirmButtonText: "確定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            const res = await deleteBlogAPI(row.id);
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
    async editBlog(ID) {
      // console.log(id);
      const res = await getOneBlogAPI(ID);
      console.log(res);

      const { id, title, content, img, visible } = res.data;
      this.form = { ...this.form, id, title, content, img, visible };

      this.isEdit = true;
      this.dialog = true;
    },
    updateBlog() {
      this.loading = true;
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          console.log(this.form);

          const result = await updateBlogAPI(this.form);
          console.log(result);

          if (result.status === 200) {
            this.dialog = false;
            const res = await getAllBlogAPI();
            console.log(res);
            this.list = res.data;
            this.total = res.data.length;

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
    addNewBlog() {
      this.isEdit = false;
      this.resetForm();
      this.dialog = true;
    },
    async saveNewBlog() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          console.log(this.form);

          const res = await addNewBlogAPI(this.form);
          console.log(res);

          if (res.status === 200) {
            this.resetForm();
            this.dialog = false;
            const res = await getAllBlogAPI();
            this.list = res.data;
            this.total = res.data.length;
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
      if (this.search.title || this.search.content) {
        const res = await searchBlogAPI(this.search);
        // console.log(res);
        if (res.data) {
          this.list = res.data;
          this.total = res.data.length;
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
.adminBlog {
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    .total {
      padding-right: 10px;
    }
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
