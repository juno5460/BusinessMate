var path = require('path'),
	rootPath = path.normalize(__dirname + '/..');

// 项目配置
module.exports = {
<<<<<<< HEAD
	development: {
		db: 'mongodb://localhost/contractDB',
		root: rootPath,
		app: {
			name: 'Nodejs Express Mongoose Demo'
		}
	},
	production: {
		db: 'mongodb://localhost/test',
		root: rootPath,
		app: {
			name: 'Nodejs Express Mongoose Demo'
		}
=======
	db: 'mongodb://localhost/contractDB',
	root: rootPath,
	app: {
		name: 'BusinessMate'
>>>>>>> dec4c64354ee52e0921a28b3847a599d2dc85904
	}
};