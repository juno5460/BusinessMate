//定义数据模型
///exmple ////
////
var get = require('./getData');
var contractData1 = get.returnData1(); //获取数据源
var contractData2 = get.returnData2();
////
var mongodb = require('mongodb');
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
var db = new Db("Daniel", new Server("127.0.0.1", 27017, {}), {
	w: 1
});
var newCollection = db.collection("users3");

///insert Doc-data

exports.insertDoc = function(recData, callback) {
	db.open(function(req, res) {
		console.log("connect database successfully");
		newCollection.insert(recData, {
			w: 1
		}, function(err, result) {
			newCollection.find().toArray(function(err, docu) {
				callback(docu);
				db.close();
			});
		});
	});
};
///////check Doc-data

exports.checkData = function(id, callback) {
	db.open(function(req, res) {
		console.log("connect database successfully");
		newCollection.find(id).toArray(function(error, docu) {
			db.close();
			callback(docu);
		});

	});
};
/////跟踪合同开始日期结束日期
//id:{Id: "CA123"}
exports.checkTimeOf = function(id, callback) {
	db.open(function(req, res) {
		console.log("connect database successfully");
		newCollection.find(id).each(function(error, docu) {
			if (docu) {
				var getTime;
				var startTime = docu.events[0].date;
				var endTime = docu.events[0].date;
				for (var i = 1; i < docu.events.length; i++) {
					if (startTime > docu.events[i].date)
						startTime = docu.events[i].date;
					if (endTime < docu.events[i].date)
						endTime = docu.events[i].date;
					//					console.log("Doc from Each ");
					//					console.dir(docu);
					//					console.dir(docu.businessname);
					//					console.log(docu.events[i].date);
				}
				//				console.log(startTime);
				//				console.log(endTime);
				console.log("1: " + startTime + " " + endTime);
				getTime = startTime + " " + endTime;
				//				getTime="heooo";
				db.close();
				callback(getTime);
			}
		});
	});
};
/////展示合同详情
exports.showData = function(callback) {
	var result = null;
	db.open(function(req, res) {
		console.log("connect database successfully");
		newCollection.find().toArray(function(err, docu) {
			callback(docu);
			db.close();
		});
	});
};
//////update Doc-data

exports.updateData = function(callback) {
	db.open(function(req, res) {
		console.log("connect database successfully");
		newCollection.update({
			Id: "CA123",
			events: {
				name: "收取尾款",
				date: "2013-12-20",
				complete: false
			}
		}, {
			$set: {
				"events.$.date": "2013-11-20"
			}
		}, function(error, cursor) {
			newCollection.find({
				Id: "CA123"
			}).toArray(function(error, doc) {
				db.close();
				callback(doc);
			});
		});
	});
};
////updateSymble
/*
   option = {Id: "CA123",events: {name: "收取尾款"}};
   result = {"Events.$.complete": true};
*/

exports.updateSymble = function(id, opt, resu, callback) {
	db.open(function(req, res) {
		console.log("connect database successfully");
		newCollection.update(opt, {
			$set: resu
		}, function(error, cursor) {
			newCollection.find(id).toArray(function(error, doc) {
				db.close();
				callback(doc);
			});
		});
	});
};
////////remove Doc-data
/////删除文档数据,返回结果给终端 ,参数id为键值对:{Id: "CA123"}
////collection1.remove()是删除集合内的所有文档
/////db.dropCollection(collectionName,claaback());是删除集合

exports.removeDoc = function(id, callback) {
	db.open(function(req, res) {
		console.log("connect database successfully");
		newCollection.remove(id, {
			safe: true
		}, function(error, cursor) {
			newCollection.find().toArray(function(error, doc) {
				db.close();
				callback(doc);
			});
		});
	});
};
//////删除一个事件

exports.deleteEvent = function(id, events, callback) {
	db.open(function(req, res) {
		console.log("connect database successfully");
		newCollection.update(id, {
			$pull: events
		}, function(error, cursor) {
			newCollection.find(id).toArray(function(error, doc) {
				callback(doc);
				db.close();
			});
		});
	});
};
///添加一个事件

exports.addEvent = function(id, events, callback) {
	db.open(function(req, res) {
		console.log("connect database successfully");
		newCollection.update(id, {
			$addToSet: events
		}, function(error, cursor) {
			newCollection.find(id).toArray(function(error, doc) {
				callback(doc);
				db.close();
			});
		});
	});
};
////计算文档集数目

exports.countDoc = function(callback) {
	db.open(function(req, res) {
		console.log("connect database successfully");
		newCollection.count(function(err, count) {
			callback(count);
		});
		db.close();
	});
};
/////计算符合条件的文档数目
exports.getDoc = function(callback) {
	db.open(function(req, res) {
		console.log("connect database successfully");
		newCollection.count({
			Id: "CA123"
		}, function(err, count) {
			console.log("collection have %d document you want", count);
		});
		db.close();
	});
};