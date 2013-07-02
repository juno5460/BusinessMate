var path = require('path'),
	rootPath = path.normalize(__dirname + '/..');

// 项目配置
module.exports = {
	development: {
		db: 'mongodb://localhost/contractDB',
		root: rootPath,
		app: {
			name: 'BusinessMate'
		}
	},
	production: {
		db: 'mongodb://localhost/BusinessMate',
		root: rootPath,
		app: {
			name: 'BusinessMate'
		}
	}
};