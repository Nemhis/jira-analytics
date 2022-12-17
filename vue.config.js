// eslint-disable-next-line @typescript-eslint/no-var-requires
const StylelintPlugin = require('stylelint-webpack-plugin');
const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: process.env.DEV_DOMAIN,
  },
  configureWebpack: {
    plugins: [new StylelintPlugin({ files: ['src/**/*.vue', 'src/**/*.scss'] })],
  },
  pwa: {
    workboxPluginMode: 'GenerateSW',
    name: 'Jira analytics',
    themeColor: '#FFF',
    manifestOptions: {
      background_color: '#FFF',
      description: 'Application to analyze jira metrics',
    },
  },
});
