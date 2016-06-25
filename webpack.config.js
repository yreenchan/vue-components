const fs = require('fs');
const path = require('path');

var basePath = './examples/';
var entrys = {};
fs.readdirSync(basePath).forEach(function(dirname) {
	var stat = fs.lstatSync(basePath + dirname);
	if (stat.isDirectory()) {
		if (fs.existsSync(basePath + dirname + '/entry.js')) {
			entrys[dirname] = [basePath + dirname + '/entry.js'];
		}
	}
});

var baseAliasPath = path.resolve(__dirname, './src/components/') + '/';
var alias = {
	vue: path.resolve(__dirname, './src/lib/vue.js')
};
fs.readdirSync(baseAliasPath).forEach(function(dirname) {
	var stat = fs.lstatSync(baseAliasPath + dirname);
	if (stat.isDirectory()) {
		if (fs.existsSync(baseAliasPath + dirname + '/index.js')) {
			alias[dirname] = baseAliasPath + dirname + '/index.js';
		}
	}
});

module.exports = {
	entry: entrys,
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, './dist/'),
		publicPath: '/dist/',
		libraryTarget: 'umd'
	},
	module: {
		loaders: [
			{ test: /\.html$/, loader: 'html', exclude: /node_modules/ },
			{ test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
			{ test: /\.css$/, loader: 'style!css', exclude: /node_modules/ }
		]
	},
	resolve: {
		root: './src/components',
		alias: alias
	},
	devtool: '#source-map'
};