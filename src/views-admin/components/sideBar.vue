<template>
  <div class="sidebar">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <div>
        <!-- logo -->
        <div class="logo" v-on:click="$router.push('/')">
          <img src="@/assets/image/25°C-logo-vertical-bigtext.png" alt="" />
        </div>
        <!-- menu -->
        <el-menu
          default-active
          mode="vertical"
          :collapse-transition="false"
          :unique-opened="true"
        >
          <!-- 菜单中的每一项 -->
          <el-menu-item index="1" @click="$router.push('/admin/workbench')">
            <i class="el-icon-data-board"></i>
            <span slot="title">工作台</span>
          </el-menu-item>

          <el-menu-item index="2" @click="$router.push('/admin/product')">
            <i class="el-icon-shopping-bag-1"></i>
            <span slot="title">商品管理</span>
          </el-menu-item>

          <el-menu-item index="3" @click="$router.push('/admin/blog')">
            <i class="el-icon-notebook-1"></i>
            <span slot="title">文章管理</span>
          </el-menu-item>

          <el-menu-item index="4" @click="$router.push('/admin/user')">
            <i class="el-icon-user"></i>
            <span slot="title">會員管理</span>
          </el-menu-item>

          <el-menu-item index="5" @click="$router.push('/admin/orders')">
            <i class="el-icon-tickets"></i>
            <span slot="title">訂單管理</span>
          </el-menu-item>
        </el-menu>
      </div>

      <!-- 登出按鈕 -->
      <el-button type="plain" class="logout-btn" @click="logOut"
        >登出</el-button
      >
    </el-scrollbar>
  </div>
</template>

<script>
// import { removeAdminToken } from "@/utils/auth";
export default {
  name: "side-Bar",
  methods: {
    logOut() {
      this.$confirm("確定登出嗎？", {
        confirmButtonText: "確定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // removeAdminToken();
          this.$message.success("登出成功");
          this.$router.push("/");
        })
        .catch(() => {
          return false;
        });
    },
  },
};
</script>

<style>
.sidebar {
  .el-scrollbar {
    height: 100vh;
    .el-scrollbar__view {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .logo {
      /* background-color: #091b0c; */
      width: 100%;
      img {
        width: 80%;
        height: auto;
        margin-left: 10px;
      }
    }
    .el-menu {
      border: transparent;
      .el-menu-item {
        span {
          padding-left: 5px;
        }
      }
      .el-menu-item.is-active {
        color: #18a999;
      }
      .el-menu-item:focus,
      .el-menu-item:hover {
        background-color: #18a9980a;
      }
    }
    .el-button {
      margin: 40px auto;
    }
    .el-button:focus,
    .el-button:hover {
      color: #18a999;
      border-color: #dcdfe6;
      background-color: #18a9980a;
    }
  }
}
</style>
