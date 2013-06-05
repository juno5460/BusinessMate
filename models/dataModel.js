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
//var getTime = 123;
///insert Doc-data

exports.insertDoc = function() {
	db.open(function(req, res) {
		console.log("connect database successfully");
		newCollection.insert(contractData1, {
			w: 1
		}, function(err, result) {
			console.log("insert contractData successfully");
		});
	});
};
///////check Doc-data

exports.checkData = function() {
	db.open(function(req, res) {
		console.log("connect database successfully");
		newCollection.find({
			Id: "CA123"
		}).each(function(error, docu) {
			if (docu) {
				console.log("Doc from Each ");
				console.dir(docu);
				console.dir(docu.businessname);
				console.dir(docu.events[2].date);
			}
		});
	});
};
exports.checkTimeOf = function() {
	db.open(function(req, res) {
		console.log("connect database successfully");
		newCollection.find({
			Id: "CA123"
		}).each(function(error, docu) {
			if (docu) {
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
				console.log(startTime);
				console.log(endTime);
			}
		});
	});
	return ();
};
/////展示合同详情
exports.showData = function() {
	db.open(function(req, res) {
		console.log("connect database successfully");
		newCollection.find().each(function(err, docu) {
			if (docu) {
				console.log("合同编号:    " + docu.Id);
				console.log("合同名称:    " + docu.Name);
				console.log("合同事件:");
				console.dir(docu.Events);
			}
		});
	});
};
//////update Doc-data

exports.updateData = function() {
	db.open(function(req, res) {
		console.log("connect database successfully");
		newCollection.update({
			Id: "CA123",
			Events: {
				eventName: "收取尾款",
				cdate: "2013-12-20"
			}
		}, {
			$set: {
				"Events.$.cdate": "2013-11-20"
			}
		}, function(error, cursor) {
			newCollection.find(function(error, cursor) {
				cursor.each(function(error, doc) {
					if (doc) {
						console.log("update successfully");
					}
				});
			});
		});
	});
};
////updateSymble
/*
   option = {Id: "CA123",events: {name: "收取尾款"}};
   result = {"Events.$.complete": true};
*/

exports.updateSymble = function(option, result) {
	db.open(function(req, res) {
		console.log("connect database successfully");
		newCollection.update(option, {
			$set: result
		}, function(error, cursor) {
			newCollection.find(function(error, cursor) {
				cursor.each(function(error, doc) {
					if (doc) {
						console.log("update successfully");
					}
				});
			});
		});
	});
};
////////remove Doc-data
/////删除文档数据,返回结果给终端 
////collection1.remove()是删除集合内的所有文档
/////db.dropCollection(collectionName,claaback());是删除集合

exports.removeDoc = function() {
	db.open(function(req, res) {
		console.log("connect database successfully");
		newCollection.remove({
			Id: "CA123"
		}, {
			safe: true
		}, function(error, cursor) {
			newCollection.find(function(error, cursor) {
				cursor.each(function(error, doc) {
					if (doc) {
						console.log("remove document successfully!");
					}
				});
			});
		});
	});
};
//////删除一个事件

exports.removeEvent = function() {
	db.open(function(req, res) {
		console.log("connect database successfully");
		newCollection.update({
			Id: "CA123"
		}, {
			$pull: {
				Events: {
					eventName: "收取尾款"
				}
			}
		}, function(error, cursor) {
			newCollection.find(function(error, cursor) {
				cursor.each(function(error, doc) {
					if (doc) {
						console.log("remove Event successfully!");
					}
				});
			});
		});
	});
};
///添加一个事件

exports.addEvent = function() {
	db.open(function(req, res) {
		console.log("connect database successfully");
		newCollection.update({
			Id: "CA123"
		}, {
			$addToSet: {
				Events: {
					eventName: "收取尾款",
					cdate: "2013-11-20"
				}
			}
		}, function(error, cursor) {
			newCollection.find(function(error, cursor) {
				cursor.each(function(error, doc) {
					if (doc) {
						console.log("add Event successfully!");
					}
				});
			});
		});
	});
};

////计算文档集数目

exports.allDoc = function() {
	db.open(function(req, res) {
		console.log("connect database successfully");
		newCollection.count(function(err, count) {
			console.log("collection have %d documents", count);
		});
	});
};
/////计算符合条件的文档数目
exports.getDoc = function() {
	db.open(function(req, res) {
		console.log("connect database successfully");
		newCollection.count({
			Id: "CA123"
		}, function(err, count) {
			console.log("collection have %d document you want", count);
		});
	});
};