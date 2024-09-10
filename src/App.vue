<template>
  <div id="app">
    <navigation></navigation>
    <transition
      :enter-active-class="enterTransition"
      :leave-active-class="leaveTransition"
    >
      <router-view class="router-view" />
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      enterTransition: "animate__animated animate__fadeIn",
      leaveTransition: "animate__animated animate__fadeOut",
    };
  },
  watch: {
    $route(to, from) {
      // console.log(to.meta.depth, from.meta.depth);
      let toDepth = to.meta.depth;
      let fromDepth = from.meta.depth;
      if (fromDepth > toDepth) {
        this.enterTransition = "animate__animated animate__slideInLeft";
        this.leaveTransition = "animate__animated animate__slideOutRight";
      } else {
        this.enterTransition = "animate__animated animate__slideInRight";
        this.leaveTransition = "animate__animated animate__slideOutLeft";
      }
      if (fromDepth > toDepth) {
        this.enterTransition = "animate__animated animate__slideInLeft";
        this.leaveTransition = "animate__animated animate__slideOutRight";
      } else if (fromDepth < toDepth) {
        this.enterTransition = "animate__animated animate__slideInRight";
        this.leaveTransition = "animate__animated animate__slideOutLeft";
      } else {
        this.enterTransition = "animate__animated animate__fadeIn";
        this.leaveTransition = "animate__animated animate__fadeOut";
      }
    },
  },
  // created() {
  //   this.$navigation.on("forward", () => {
  //     this.enterTransition = "animate__animated animate__slideInRight";
  //     this.leaveTransition = "animate__animated animate__slideOutLeft";
  //     console.log("forward");
  //   });
  //   this.$navigation.on("back", () => {
  //     this.enterTransition = "animate__animated animate__slideInLeft";
  //     this.leaveTransition = "animate__animated animate__slideOutRight";
  //     console.log("back");
  //   });
  //   this.$navigation.on("replace", () => {
  //     this.enterTransition = "animate__animated animate__fadeIn";
  //     this.leaveTransition = "animate__animated animate__fadeOut";
  //     console.log("replace");
  //   });
  // },
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #4d4e4e;
  .router-view {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
}
</style>
