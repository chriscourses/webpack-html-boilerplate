const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/main.js',
    output: {
        path: __dirname + '/dist/',
        filename: 'js/main.bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader!sass-loader'
                })
            },

            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'img'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('css/style.css'),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            server: { baseDir: ['dist'] },
            files: ['./dist/*', '**/*.html']
        }),
        new HtmlWebpackPlugin({
            title: 'My App',
            template: 'src/index.html',
            filename: 'index.html'
        })
    ],
    watch: true,
    devtool: 'source-map'
}
