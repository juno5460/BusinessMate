var path = require('path'),
	rootPath = path.normalize(__dirname + '/..');

// 项目配置
module.exports = {
	db: 'mongodb://localhost/contractDB',
	root: rootPath,
	app: {
		name: 'BusinessMate'
	}
};