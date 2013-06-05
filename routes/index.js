/*
 * GET home page.
 */

exports.index = function(req, res) {
	res.render('postDemo', {
		title: 'Express'
	});
};

exports.postDemo = function(req, res) {
	res.render('postDemo', {
		title: 'Express'
	});
};

exports.list = function(req, res) {
	//////////////test 测试mongodb数据库的创建,文档级的增,删,查,改操作
	res.send("respond with a resource");
	////
};