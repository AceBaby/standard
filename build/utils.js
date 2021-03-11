'use strict'
const path = require('path');
const os = require('os');
const config = require('../config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

const packageConfig = require('../package.json')

exports.assetsPath = function(_path) {
    const assetsSubDirectory = process.env.NODE_ENV === 'production'
        ? config.build.assetsSubDirectory
        : config.dev.assetsSubDirectory;

    return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function(options) {
    options = options || {}
    const cssLoader = {
        loader: 'css-loader',
        options: {
            sourceMap: options.sourceMap
        }
    };

    const postcssLoader = {
        loader: 'postcss-loader',
        options: {
            sourceMap: options.sourceMap
        }
    };

    // generate loader string to be used with extract text plugin
    function generateLoaders(loader, loaderOptions) {
        const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader];
        if (loader) {
            loaders.push({
                loader: loader + '-loader',
                options: Object.assign({}, loaderOptions, {
                    sourceMap: options.sourceMap
                })
            })
        }
        // Extract CSS when that option is specified
        // (which is the case during production build)
        if (options.extract) {
            // return ExtractTextPlugin.extract({
            //   use: loaders,
            //   fallback: 'vue-style-loader'
            // })
            return [{loader: MiniCssExtractPlugin.loader}].concat(loaders);
        } else {
            return ['vue-style-loader'].concat(loaders)
        }
    }
    // 配置less
    function lessResourceLoader() {
        var loaders = [
            cssLoader,
            'less-loader',
            {
                loader: 'sass-resources-loader',
                options: {
                    resources: [
                        path.resolve(__dirname, '../src/assets/style/basic.less'),
                    ]
                }
            }
        ];
        if (options.extract) {
            return [{loader: MiniCssExtractPlugin.loader}].concat(loaders);
        } else {
            return ['vue-style-loader'].concat(loaders)
        }
    }
    // https://vue-loader.vuejs.org/en/configurations/extract-css.html
    return {
        css: generateLoaders(),
        postcss: generateLoaders(),
        less: generateLoaders('less').concat({
            loader: 'sass-resources-loader',
            options: {

                resources: path.resolve(__dirname, '../src/assets/style/basic.less')

            } }),
        sass: generateLoaders('sass', { indentedSyntax: true }),
        scss: generateLoaders('sass'),
        stylus: generateLoaders('stylus'),
        styl: generateLoaders('stylus')
    }
};
// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function(options) {
    const output = []
    const loaders = exports.cssLoaders(options)
    for (const extension in loaders) {
        const loader = loaders[extension]
        output.push({
            test: new RegExp('\\.' + extension + '$'),
            use: loader
        })
    }
    return output
}
exports.createNotifierCallback = () => {
    const notifier = require('node-notifier')
    return (severity, errors) => {
        if (severity !== 'error') return
        const error = errors[0]
        const filename = error.file && error.file.split('!').pop()
        notifier.notify({
            title: packageConfig.name,
            message: severity + ': ' + error.name,
            subtitle: filename || '',
            icon: path.join(__dirname, 'logo.png')
        })
    }
}
exports.createHappyPlugin = (id, loaders) => new HappyPack({
  id: id,
  loaders: loaders,
  threadPool: happyThreadPool,
  verbose: process.env.HAPPY_VERBOSE === '1' // make happy more verbose with HAPPY_VERBOSE=1
});
