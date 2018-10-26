const NodemonPlugin = require('nodemon-webpack-plugin')
const path = require('path');
const webpack = require('webpack');
const fs = require('fs');

const alias = require('./alias')
console.log(alias)

var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = {
    // The configuration for the server-side rendering
    name: 'server',
		mode: 'development',
    target: 'node',
    entry: './src/server.js',
    externals: nodeModules,
    module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: {
						loader: "babel-loader"
					}
				}
			]
    },
		resolve: {
		  alias: alias,
		  enforceModuleExtension: false
		},
		plugins: [new NodemonPlugin()]
};
