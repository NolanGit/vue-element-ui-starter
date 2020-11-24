module.exports = {
  publicPath: "dist/",
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      // 防止 Cyclic dependency 错误
      args[0].chunksSortMode = 'none';
      return args;
    });
  },
};
