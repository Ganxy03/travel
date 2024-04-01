const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: '0.0.0.0',
    port: 40327,
    client: {
      webSocketURL: 'ws://0.0.0.0:40327/ws',
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    proxy: {
      // 将所有以 '/api' 开头的请求代理到 VUE_APP_BASE_URI
      '/api': {
        target: process.env.VUE_APP_BASE_URI,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '', // 重写路径，去掉 '/api' 前缀
        },
      },
    },
    historyApiFallback: true,
    allowedHosts: "all"
  }
})
