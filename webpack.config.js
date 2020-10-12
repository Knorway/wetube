const path = require('path');
// eslint-disable-next-line
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const ENTRY_FILE = path.resolve(__dirname, 'assets', 'js', 'main.js');
const OUTPUT_DIR = path.join(__dirname, 'static');

const MODE = process.env.WEBPACK_ENV;

const config = {
	entry: ['@babel/polyfill', ENTRY_FILE],
	mode: MODE,
	module: {
		rules: [
			{
				test: /\.(js)$/,
				use: [
					{
						loader: 'babel-loader',
					},
				],
			},
			{
				test: /\.scss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: 'css-loader',
					},
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [['autoprefixer']],
							},
						},
					},
					{
						loader: 'sass-loader',
					},
				],
			},
		],
	},
	output: {
		path: OUTPUT_DIR,
		filename: '[name].js',
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
		}),
	],
	devtool: 'cheap-module-source-map',
};

module.exports = config;
