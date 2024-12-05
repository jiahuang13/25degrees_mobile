const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      less: {
        additionalData: `@import "@/style/index.less";`,
      },
    },
  },
  configureWebpack: {
    resolve: {
      fallback: {
        // 忽略 Node.js 專屬模組，避免 require 相關錯誤
        fs: false,
        path: false,
        os: false,
      },
    },
  },
});
