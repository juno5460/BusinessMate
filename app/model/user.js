/**
 * Module dependencies.
 */

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	Repository = require('./repository');



var UserSchema = mongoose.Schema({ //创建合同模型对象
	uid: String, //用户账号
	provider: String, //
	username: String, //用户名
	email: String, //邮箱
	password: String //密码
});


UserSchema.methods = {
	test: function() {
		console.info("=======test");
	},
	/**
	 * Authenticate - check if the passwords are the same
	 *
	 * @param {String} plainText
	 * @return {Boolean}
	 * @api public
	 */
	authenticate: function(plainText) {
		return plainText == this.password;
	},
	getUnique: function(callback) { //构造唯一id赋予用户
		var myDate = new Date();
		var year = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
		var month = myDate.getMonth(); //获取当前月份(0-11,0代表1月)
		var day = myDate.getDate(); //获取当前日(1-31)
		var hour = myDate.getHours(); //获取当前小时数(0-23)
		var minute = myDate.getMinutes(); //获取当前分钟数(0-59)
		var second = myDate.getSeconds(); //获取当前秒数(0-59)
		var millSecond = myDate.getMilliseconds(); //获取当前毫秒数(0-999)
		month = month < 10 ? "0" + month : month;
		day = day < 10 ? "0" + day : day;
		hour = hour < 10 ? "0" + hour : hour;
		minute = minute < 10 ? "0" + minute : minute;
		second = second < 10 ? "0" + second : second;
		millSecond = millSecond < 100 ? (millSecond < 10 ? "00" + millSecond : "0" + millSecond) : millSecond;
		var uniqueNum = year + month + day + hour + minute + second + millSecond;
		console.log(uniqueNum);
		callback(uniqueNum);
	},
	checkUserInfo: function(callback) {
		this.model('User').find({}, {
			uid: 1,
			username: 1,
			email: 1,
			password: 1
		}, function(err, docs) {
			callback(docs);
		});
	},
	checkUserIdData: function(id, callback) {
		this.model('User').find(id, function(err, docs) {
			console.log("====show====");
			callback(docs);
		});
	},
	insertUserData: function(rdata) {
		User = this.model('User');
		var user = new User(rdata);
		user.save();
		console.log("insert successfully");
	},
	updateUserIdData: function(id, result, callback) {
		User = this.model('User');
		User.update({
			cid: id
		}, result, function() {
			User.find({
				cid: id
			}, function(err, docs) {
				callback(docs);
			});
		});
	},
	removeUserData: function(id, callback) {
		User = this.model('User');
		User.remove({
			uid: id
		}, function() {
			User.find({
				uid: id
			}, function(err, docs) {
				callback(docs);
			});
		});
	}
};


//Repository.enhanceSchema(UserSchema);

mongoose.model('User', UserSchema); //创建新合同对象,并关联到模型