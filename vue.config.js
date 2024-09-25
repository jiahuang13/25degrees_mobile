const { defineConfig } = require("@vue/cli-service");
// const path = require("path");
//less文件的路径
// const myTheme = path.resolve(__dirname, "@/style/index.less");

module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      less: {
        additionalData: `@import "@/global.less";`,
      },
    },
  },
});
