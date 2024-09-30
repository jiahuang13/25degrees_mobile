const { defineConfig } = require("@vue/cli-service");
// const path = require("path");
//less文件的路径
// const myTheme = path.resolve(__dirname, "@/style/index.less");

module.exports = defineConfig({
  transpileDependencies: true,
  // productionSourceMap: true, // 確保生產和開發模式中都生成 source-map
  // configureWebpack: {
  //   devtool: "source-map",
  // }, // Source Map: 讓瀏覽器在報錯時顯示對應的原始代碼行號
  css: {
    loaderOptions: {
      less: {
        additionalData: `@import "@/style/index.less";`,
      },
    },
  },
});
