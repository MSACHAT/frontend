const webpack = require('webpack');
const SemiWebpackPlugin = require('@douyinfe/semi-webpack-plugin').default;

module.exports = {
  webpack: {
    plugins: [
      new SemiWebpackPlugin({
        theme: '@semi-bot/semi-theme-moonshot',
        include: '~@semi-bot/semi-theme-moonshot/scss/local.scss',
        name: '@semi-bot/semi-theme-moonshot',
      }),

      // 定义环境变量
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(
          process.env.NODE_ENV || 'development'
        ),
      }),
    ],
    configure: (webpackConfig, { env, paths }) => {
      // 设置 publicPath
      webpackConfig.output = {
        ...webpackConfig.output,
        publicPath: '/',
      };

      return webpackConfig;
    },
  },
};
