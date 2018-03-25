const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const publicDir = path.resolve(__dirname, 'public');
module.exports = {
    entry: './dev/app.js',
    output: {
        path: publicDir,
        filename: 'bundle.js'
        // publicPath: 'public/' /* if placing index.html outside of 'public' directory, need to specify a path to append to webpack generated static resources */
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
    plugins: [
        new ExtractTextPlugin('style.css') // tells ExtractText lib to find files transformed by its loader, and save into style.css
    ],
    devtool: 'source-map'
};

// devServer: {
//     contentBase: publicDir,
//         port: 9000
// },
