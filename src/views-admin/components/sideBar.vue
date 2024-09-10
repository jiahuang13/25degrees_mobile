<template>
  <div class="sidebar">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <!-- 上方logo -->
      <div class="logo" v-on:click="$router.push('/')">
        <img src="@/assets/image/25degrees_logo.png" alt="" />
      </div>
      <!-- 左侧菜单组件 -->
      <el-menu
        default-active="1"
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

        <!-- <el-submenu index="2" @click.native="$router.push('/admin/product')">
        <template slot="title">
          <i class="el-icon-shopping-bag-1"></i>
          <span>商品管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
        </el-menu-item-group>
      </el-submenu> -->

        <el-menu-item index="3" @click="$router.push('/admin/article')">
          <i class="el-icon-notebook-1"></i>
          <span slot="title">文章管理</span>
        </el-menu-item>

        <el-menu-item index="4" @click="$router.push('/admin/user')">
          <i class="el-icon-user"></i>
          <span slot="title">會員管理</span>
        </el-menu-item>
      </el-menu>

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
    .logo {
      background-color: #091b0c;
      width: 100%;
      text-align: center;
      img {
        width: 45%;
        height: auto;
        margin: 10px 0;
      }
    }
    .logout-btn {
      position: fixed;
      bottom: 30px;
      left: 80px;
    }
  }
}
</style>
