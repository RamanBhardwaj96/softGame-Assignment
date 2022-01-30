const path = require('path');
const root = path.join(__dirname, '../');
const config = require(path.join(root, 'package.json'));

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    context: root, // to automatically find tsconfig.json
    entry: path.join(root, 'src/index.ts'),
    devtool: "eval-cheap-source-map",
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: config.title,
            template: './template/index.html',
            hash: true
        }),
        new CopyWebpackPlugin([
            { from: 'assets', to: 'assets' }
        ]),
    ]
};