<template>
  <div class="app-wrapper">
    <Sidebar class="sidebar-container" />
    <router-view></router-view>
  </div>
</template>

<script>
import Sidebar from "./components/sideBar.vue";

export default {
  name: "adminIndex",
  components: {
    Sidebar,
  },
};
</script>

<style lang="scss">
html,
body {
  min-height: 100%;
  margin: 0;
  padding: 0;
}
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  overflow: hidden;
  .main-container {
    background-color: #f4f6f8;
    flex: 1;
    min-width: 820px;
  }
  .sidebar-container {
    width: 15vw;
    max-width: 260px;
    background-color: #fff;
    height: 100vh;
  }
}
</style>
