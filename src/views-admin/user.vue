<template>
  <div class="adminUser">
    <!-- 搜尋 -->
    <div class="search-container">
      <span class="search-label">帳號：</span>
      <el-input
        v-model="search.username"
        clearable
        placeholder="請輸入內容"
        class="search-main"
      />
      <span class="search-label">Email：</span>
      <el-input
        v-model="search.email"
        clearable
        placeholder="請輸入內容"
        class="search-main"
      />
      <span class="search-label">等級：</span>
      <el-select v-model="search.role">
        <el-option
          v-for="item in roleList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <el-button type="primary" class="search-btn" @click="doSearch"
        >查詢</el-button
      >
    </div>
    <!-- 表格 -->
    <el-scrollbar always>
      <van-loading v-if="loading" type="spinner" size="30px" color="#18A999" />
      <div class="table" v-else>
        <el-table style="width: 100%" :data="list" empty-text="沒有符合資料">
          <el-table-column label="ID" prop="id" width="50" />
          <el-table-column label="帳號" prop="username" />
          <el-table-column label="email" prop="email" />
          <el-table-column label="註冊時間" prop="created_at" />
          <el-table-column
            label="權限"
            prop="role"
            :formatter="formatRole"
            width="150"
          />
          <el-table-column label="操作" fixed="right" width="150">
            <template #default="scope">
              <el-button size="mini" type="text" @click="editUser(scope.row.id)"
                >編輯</el-button
              >
              <el-button size="mini" type="text" @click="delUser(scope.row)"
                >刪除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-scrollbar>

    <!-- 編輯對話框 -->
    <el-dialog
      title="編輯會員"
      :visible.sync="editDialog"
      width="70%"
      @close="confirmDialog"
    >
      <el-form
        label-position="right"
        label-width="80px"
        ref="editForm"
        :model="editForm"
        :rules="rules"
      >
        <el-form-item label="帳號" prop="username">
          <el-input v-model="editForm.username"></el-input>
        </el-form-item>
        <el-form-item label="電子信箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="權限" prop="role">
          <el-select v-model="editForm.role" placeholder="請選擇">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
              :disabled="item.id === null"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false">取 消</el-button>
        <el-button type="primary" @click="updateUser">確 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getAllUserAPI,
  getUserByIdAPI,
  updateUserAPI,
  deleteUserAPI,
  searchUserAPI,
} from "@/api/user";
export default {
  name: "adminUser",
  data() {
    return {
      loading: true,
      list: [], // 會員列表
      // 请求参数
      search: {
        username: "",
        email: "",
        role: null,
      },
      roleList: [
        {
          id: null,
          name: "全部",
        },
        {
          id: 0,
          name: "一般會員",
        },
        {
          id: 1,
          name: "VIP會員",
        },
        {
          id: 2,
          name: "管理員",
        },
        {
          id: 3,
          name: "超級管理員",
        },
      ],
      editDialog: false,
      editForm: {
        id: "",
        username: "",
        email: "",
        role: "",
      },
      rules: {
        username: [
          {
            required: true,
            pattern: /^[0-9a-zA-Z_]{5,}$/,
            message: "帳號需為至少5位的數字或英文字母",
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: "請輸入有效的電子信箱",
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
      // 1. 调用接口
      const res = await getAllUserAPI();
      // 2. 把后端数据赋值给响应式list
      console.log(res);
      if (res && !res.error) {
        res.data.forEach((user) => {
          const date = new Date(user.created_at);
          user.created_at = date.toLocaleString("zh-TW"); // 例如：2024/09/18 13:24:52
        });

        this.list = res.data;
        this.total = res.data.length;
      }
    },
    formatRole(row) {
      // if (this.activeTab === "all") {
      //   return this.orders; // 返回所有訂單
      // }
      // return this.list.filter((item) => item.status === this.);
      const role = this.roleList.find((item) => item.id === row.role);
      return role.name;
    },
    delUser(row) {
      this.$confirm(`確定刪除會員 ${row.name} 嗎？`, {
        confirmButtonText: "確定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            const res = await deleteUserAPI(row.id);
            if (res) {
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
    async editUser(id) {
      // console.log(id);
      const res = await getUserByIdAPI(id);
      console.log(res);
      this.editForm = res.data;
      this.editDialog = true;
    },
    updateUser() {
      this.loading = true;

      this.$refs.editForm.validate(async (valid) => {
        if (valid) {
          // console.log(this.editForm);

          const result = await updateUserAPI(this.editForm);
          console.log(result);

          if (result) {
            // 關閉彈框
            this.editDialog = false;
            // 重新取得會員資料
            const res = await this.getList();
            // console.log(res)
            this.list = res.data;
            // 顯示成功提示
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
    confirmDialog() {
      // this.$confirm("編輯還沒儲存，確定離開嗎?", "提示", {
      //   confirmButtonText: "確定",
      //   cancelButtonText: "取消",
      //   type: "warning",
      // })
      //   .then(() => {
      //     this.$refs.editForm.resetFields();
      //     // this.editDialog = false;
      //   })
      //   .catch(() => {
      //     return false;
      //   });
    },
    async doSearch() {
      if (
        this.search.username ||
        this.search.email ||
        this.search.role !== null
      ) {
        const res = await searchUserAPI(this.search);
        console.log(res);
        if (res.data) {
          this.list = res.data;
        }
      } else {
        this.getList();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.adminUser {
  padding: 20px;
  background-color: #fff;
  .van-loading {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
  }
}

.search-container {
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(237, 237, 237, 0.9);
  padding-bottom: 20px;
  .search-main {
    width: 150px;
    margin-right: 10px;
  }
  .search-btn {
    margin-left: 20px;
  }
}
.create-container {
  margin: 10px 0px;
}
.page-container {
  padding: 4px 0px;
  text-align: right;
}
.form-container {
  padding: 0px 80px;
}
</style>
