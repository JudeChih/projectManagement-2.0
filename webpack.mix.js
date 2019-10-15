const { mix } = require('laravel-mix');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

mix.webpackConfig({
    output: {
        publicPath: "/",
    },
    plugins: [
        new BundleAnalyzerPlugin(),
    ],
    externals: {
        'element-ui': 'ELEMENT',
        'axios': 'axios',
        'vue': 'Vue',
        'vuex': 'Vuex',
        'vue-router': 'VueRouter',
        'vue-chartjs': 'VueChartJs',
        'lodash': '_',
        'jquery': 'jQuery'
    }
}).js('resources/assets/js/app.js', 'public/js')
  .js('resources/assets/js/index.js', 'public/js')
  .sass('resources/assets/sass/app.scss', 'public/css')
  .sass('resources/assets/sass/pages/index.scss', 'public/css')
  .sass('resources/assets/sass/components/datetimepicker.scss', 'public/css')
  .sass('resources/assets/sass/components/singlepage.scss', 'public/css')
  .sass('resources/assets/sass/components/hoverwrap.scss', 'public/css')
  .sass('resources/assets/sass/components/reminderwrap.scss', 'public/css')
  .sass('resources/assets/sass/base/style.scss', 'public/css');