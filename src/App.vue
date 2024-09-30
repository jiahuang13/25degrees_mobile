<template>
  <div id="app">
    <navigation></navigation>
    <transition
      :enter-active-class="enterTransition"
      :leave-active-class="leaveTransition"
      mode="out-in"
    >
      <router-view class="router-view" :key="$route.fullPath" />
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      enterTransition:
        "animate__animated animate__fadeIn animate__duration_custom",
      leaveTransition:
        "animate__animated animate__fadeOut animate__duration_custom",
    };
  },
  // watch: {
  //   $route(to, from) {
  //     let toDepth = to.meta.depth || 0;
  //     let fromDepth = from.meta.depth || 0;

  //     if (fromDepth > toDepth) {
  //       this.enterTransition =
  //         "animate__animated animate__slideInLeft animate__duration_custom";
  //       this.leaveTransition =
  //         "animate__animated animate__slideOutRight animate__duration_custom";
  //     } else if (fromDepth < toDepth) {
  //       this.enterTransition =
  //         "animate__animated animate__slideInRight animate__duration_custom";
  //       this.leaveTransition =
  //         "animate__animated animate__slideOutLeft animate__duration_custom";
  //     } else {
  //       this.enterTransition =
  //         "animate__animated animate__fadeIn animate__duration_custom";
  //       this.leaveTransition =
  //         "animate__animated animate__fadeOut animate__duration_custom";
  //     }
  //   },
  // },
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #4d4e4e;
}
/* 自定義動畫時間為 0.2 秒 */
.animate__duration_custom {
  animation-duration: 0.4s !important;
}
</style>
