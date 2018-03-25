const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

let entries = {
    bundle: './src/app.js'
}

//split the vendor dependencies into a separate bundle/file (if any exist)
const dependencies = require('./package.json').dependencies;
if(dependencies){
    entries['vendor'] = Object.keys(dependencies); //array of vendor library names
}

const config = {
    entry: entries,
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'main.[name]-[id].[chunkhash].js', //'name' references the entry key (i.e., 'bundle')
        hashDigestLength: 20
        // publicPath: 'public/' /* if placing index.html outside of 'public' directory, need to specify a path under 'output' which will append to webpack generated static resources */
    },
    stats: {
        colors: true
    },
    watch: true,
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.js$/,
                exclude: '/node_modules/'
            },
            {
                //plugin to extract text that is transformed by any specified loaders
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                }),
                test: /\.css$/
            },
            {
                use: [
                    {
                        loader: 'url-loader',
                        options: { limit: 40000 } //if img > 40kb then save as separate file, otherwise include as base64 string in bundle.js
                    },
                    'image-webpack-loader'
                ],
                test: /\.(jpe?g|png|gif|svg)$/,
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: "initial",
                    test: "vendor",
                    name: "vendor",
                    enforce: true
                }
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'My Webpack Demo App',
            template: 'src/index.html'
        }),
        new ExtractTextPlugin('style-[chunkhash].css'), // tells ExtractText lib to find files transformed by its loader, and save into style.css
        new CleanWebpackPlugin(['dist/*.*']) //clean dist directory on builds
    ],
    devtool: 'source-map'
};

module.exports = config;

// devServer: {
//     contentBase: publicDir,
//         port: 9000
// },
