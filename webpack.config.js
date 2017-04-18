var webpack = require("webpack");
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, "WebContent/resources/js/build/");
var APP_DIR = path.resolve(__dirname, "WebContent/resources/js/");

var config = {
	entry : APP_DIR + "/app-main.js",
	output: {
		path: BUILD_DIR,
		filename: "app-build.js"
	},
	module: {
		loaders: [{
			test: /\.scss$/,
            loaders: ['style-loader', 'css-loader', 'sass-loader']
		},
		{
			test: /\.(jpe?g|png|gif|svg)$/i,
			loaders: [
				'url-loader?limit=100000'
			]
		}]
	},
};

module.exports = config;