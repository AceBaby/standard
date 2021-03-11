'use strict';
const path = require('path');
const utils = require('./utils');
const config = require('../config');
const vueLoaderConfig = require('./vue-loader.conf');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const StyleLintWebpackPlugin = require('stylelint-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");// +++

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

const createLintingRule = () => ({
    test: /\.(js|vue)$/,
    loader: 'eslint-loader',
    enforce: 'pre',
    include: [resolve('src')],
    options: {
        formatter: require('eslint-friendly-formatter'),
        emitWarning: !config.dev.showEslintErrorsInOverlay
    }
});
module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: {
        app: './src/index.js'
    },
    plugins: [
        // make sure to include the plugin for the magic
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(),
        new StyleLintWebpackPlugin(
            {
                configFile: path.resolve('./.stylelintrc'),
                files: ['src/**/*.vue', 'src/assets/css/*.l?(e|c)ss'],
                fix: false,
                cache: true,
                emitErrors: true,
                failOnError: false
            }
        ),
        utils.createHappyPlugin('happy-babel', [{
          loader: 'babel-loader',
          options: {
            babelrc: true,
            cacheDirectory: true // 启用缓存
          }
        }])
    ],
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        chunkFilename: '[name].[hash:4].bundle_dynamic.js',
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    },
    optimization: {
    	splitChunks: {
    		chunks: 'all'
    	}
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': resolve('src'),
            vue: 'vue/dist/vue.js'
        }
    },
    module: {
        rules: [
          ...(config.dev.useEslint ? [createLintingRule()] : []),
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('node_modules/webpack-dev-server/client')],
                exclude: /node_modules/,
                options: { // 新增内容
                    presets: ['@babel/preset-env']
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 20000000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    publicPath: '../',
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    // node: {
    //     // prevent webpack from injecting useless setImmediate polyfill because Vue
    //     // source contains it (although only uses it if it's native).
    //     setImmediate: false,
    //     // prevent webpack from injecting mocks to Node native modules
    //     // that does not make sense for the client
    //     dgram: 'empty',
    //     fs: 'empty',
    //     net: 'empty',
    //     tls: 'empty',
    //     child_process: 'empty'
    // }
};
