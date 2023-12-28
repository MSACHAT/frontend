const SemiWebpackPlugin = require('@douyinfe/semi-webpack-plugin').default;

module.exports = {
    webpack: {
        plugins: [
            new SemiWebpackPlugin({
                theme: '@semi-bot/semi-theme-moonshot',
                include: '~@semi-bot/semi-theme-moonshot/scss/local.scss',
                name: '@semi-bot/semi-theme-moonshot'
            })
        ],
    },
};
