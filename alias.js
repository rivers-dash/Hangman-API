const path = require('path');

const alias = {
	App: path.resolve(__dirname, 'src/app'),
	Database: path.resolve(__dirname, 'src/app/database'),
	Models: path.resolve(__dirname, 'src/app/models'),
	Routes: path.resolve(__dirname, 'src/app/routes'),
	Configuration: path.resolve(__dirname, 'src/configuration'),
	Utils: path.resolve(__dirname, 'src/utils'),
	Api: path.resolve(__dirname, 'src/app/api'),
}

module.exports = alias
