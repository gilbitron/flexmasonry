const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const pkg = require('./package.json');

module.exports = {
    mode: process.env.NODE_ENV || 'production',
    entry: [
        './src/flexmasonry.css',
        './src/flexmasonry.js',
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'flexmasonry.js',
        library: 'FlexMasonry',
        libraryExport: 'default',
        libraryTarget: 'var',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'flexmasonry.css',
        }),
        new webpack.BannerPlugin({
            banner: 'FlexMasonry\nVersion: ' + pkg.version + '\nAuthor: ' + pkg.author + '\nLicense: ' + pkg.license
        }),
    ],
};
