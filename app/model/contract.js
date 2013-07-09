/**
 * Module dependencies.
 */

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	Repository = require('./repository');

//事件子模型
var EventsSchema = new Schema({
	id: String,
	title: String,
	remark: String,
	price: Number,
	date: String,
	completed: Boolean
});

//合同模型
var ContractSchema = mongoose.Schema({ //创建合同模型对象
	uid: String, //用户id,对应用户模型的uid
	myId: String, //合同编号
	partyA: String, //签署甲方
	partyB: String, //签署乙方
	amount: Number, //金额
	returnRatio: Number, //回款比率
	returnAmount: Number, //回款金额
	lastReturnDate: String, //上次回款日期
	signDate: String, //签署日期
	name: String, //合同名称
	tName: String, //合同模版名称
	beginDate: String, //开始日期
	endDate: String, //结束日期
	events: [EventsSchema], //合同事件
	state: String, //合同状态
	next: String //待办任务
});


ContractSchema.methods = {

	test: function() {
		console.info("=======test");
	},
	//展示所有合同重要信息
	checkInfo: function(uid,callback) {

		this.model('Contract').find({uid:uid}, {
			_id: 1,
			myId: 1,
			id: 1,
			name: 1,
			amount: 1,
			returnRatio: 1,
			returnAmount: 1,
			lastReturnDate: 1,
			signDate: 1,
			partyA: 1,
			partyB: 1,
			beginDate: 1,
			endDate: 1,
			events: 1,
			state: 1,
			next: 1
		}, function(err, docs) {
			callback(docs);
		});
	},
	//展示所有合同模版重要信息
	checkTemplateInfo: function(uid,callback) {

		this.model('Template').find({uid:uid}, {
			_id: 1,
			tName: 1
		}, function(err, docs) {
			callback(docs);
		});
	},
	//根据id展示指定合同详细信息
	/*
	 * id:合同<_id,id>
	 * callback:回调返回数据
	 */
	checkIdData: function(id, callback) {

		this.model('Contract').find(id, function(err, docs) {
			console.log("====show===");
			console.log(docs);
			callback(docs);
		});
	},
	//根据id展示指定合同详细信息
	/*
	 * id:合同模版<_id,id>
	 * callback:回调返回数据
	 */
	checkIdTemplate: function(id, callback) {

		this.model('Template').find(id, function(err, docs) {
			console.log("====show===");
			console.log(docs);
			callback(docs);
		});
	},
	//新建合同插入数据库
	/*
	 * rdata:要保存的合同对象
	 */
	insertData: function(rdata, res) {

		Contract = this.model('Contract');
		console.log("insert");
		var contract = new Contract(rdata);
		contract.save();
		res.send({
			hello: "success insert"
		});
		//	res.end();
	},
	//新建合同模版插入模版数据库
	/*
	 * rdata:要保存的合同对象
	 */
	insertTemplate: function(rdata, res) {

		Template = this.model('Template');
		console.log("insert");
		var template = new Template(rdata);
		template.save();
		res.send({
			hello: "success insert"
		});

	},
	//根据id修改指定合同
	/*
	 * id:合同<_id,id>
	 * result:传递要修改的字段JSON对象
	 * callback:回调返回数据
	 */
	updateIdData: function(id, result, callback) {

		Contract = this.model('Contract');
		console.log(id);

		Contract.update(id, result, function() {
			Contract.find(id, function(err, docs) {
				callback(docs);
			});
		});
	},
	//根据id修改指定合同模版
	/*
	 * id:合同模版<_id,id>
	 * result:传递要修改的字段JSON对象
	 * callback:回调返回数据
	 */
	updateIdTemplate: function(id, result, callback) {

		Template = this.model('Template');
		console.log(id);

		Template.update(id, result, function() {
			Template.find(id, function(err, docs) {
				callback(docs);
			});
		});
	},
	//根据id删除指定合同
	/*
	 * id:合同<_id,id>
	 * callback:回调返回数据
	 */
	removeData: function(id, callback) {

		Contract = this.model('Contract');

		Contract.remove(id, function() {
			Contract.find({
				_id: id
			}, function(err, docs) {
				callback(docs);
			});
		});
	},
	//根据id删除指定合同模版
	/*
	 * id:合同模版<_id,id>
	 * callback:回调返回数据
	 */
	removeTemplate: function(id, callback) {

		Template = this.model('Template');

		Template.remove(id, function() {
			Template.find(id, function(err, docs) {
				callback(docs);
			});
		});
	},
	//清空contracts容器接口
	removeAllData: function(callback) {

		Contract = this.model('Contract');
		Contract.remove({}, function() {
			Contract.find({}, function(err, docs) {
				callback(docs);
			});
		});
	},
	//修改合同事件完成标志,并同时更新合同状态
	/*
	 * id:合同id
	 * eventId:事件id
	 * eventName:事件名称 (或是状态名称,方便跟踪合同状态)
	 * callback:回调返回数据
	 */
	updateSymble: function(id, eventId, checkValue, remark, eventName, callback) {

		console.log('updateSymble');
		console.log(checkValue);
		Contract = this.model('Contract');

		Contract.update({
			_id: id,
			"events.id": eventId
		}, {
			"$set": {
				"events.$.completed": checkValue,
				//				"events.$.remark": remark,
				state: eventName
			}
		}, function() {
			Contract.find({
				_id: id
			}, function(err, docs) {
				callback(docs);
			});
		});
	},
	//计算所有合同的事件回收金额
	/*
	 *calback:回调返回数据
	 */
	countGetMoney: function(callback) {

		var count = 0; //存储所有合同已回款总额
		var allCount = 0; //存储所有合同总金额
		var getData;
		Contract = this.model('Contract');

		Contract.find({}, function(err, docs) {
			docs.forEach(function(doc) {
				allCount = allCount + doc.amount;
				for (var i = 0; i < doc.events.length; i++) { //遍历单个合同的事件数组
					if (doc.events[i].price > 0 && doc.events[i].completed == true)
					//					if (doc.events[i].price > 0)
						count = count + doc.events[i].price;
				}
				getData = {
					"allCount": allCount,
					"count": count,
					"ratio": parseFloat(count / allCount)
				};
				console.log(doc.events);
			});
			console.log(parseFloat(4 / 10));
			//			callback(count);
			callback(getData);
		});
	},
	//计算单个合同的事件回收金额
	/*
	 *calback:回调返回数据
	 */
	countOneGetMoney: function(id, callback) {

		var count = 0; //存储该合同已回款总额
		var allCount = 0; //存储该合同总金额
		var getData;
		var flag = 0;
		var lastDate = "无";
		var occur = new Date();
		var year = occur.getFullYear();
		var month = occur.getMonth() + 1;
		var day = occur.getDate(); ///
		day = day < 10 ? "0" + day : day;
		month = month < 10 ? "0" + month : month;
		var getOccur = year + "-" + month + "-" + day;
		Contract = this.model('Contract');

		Contract.find({
			_id: id
		}, function(err, docs) {
			docs.forEach(function(doc) {
				allCount = doc.amount;
				for (var i = 0; i < doc.events.length; i++) { //遍历该合同的事件数组
					if (doc.events[i].price > 0 && doc.events[i].completed == true)
						count = count + doc.events[i].price;
					if (flag == 0 && doc.events[i].price > 0 && doc.events[i].completed == true && (doc.events[i].date < getOccur || doc.events[i].date == getOccur)) {
						lastDate = doc.events[i].date;
						flag = 1;
					}
					if (flag == 1 && doc.events[i].price > 0 && doc.events[i].completed == true && doc.events[i].date < getOccur && doc.events[i].date > lastDate) {
						lastDate = doc.events[i].date;
					}
				}
				getData = {
					"lastDate": lastDate, //上次回款日期
					"oneAllCount": allCount, //该合同总金额
					"returnCount": count, //已回款
					"unreturnCount": allCount - count, //未回款
					"returnRatio": parseFloat(count / allCount), //已回款比率
					"unreturnRatio": parseFloat((allCount - count) / allCount) //未回款比率
				};
				console.log(doc.events);
			});
			console.log(parseFloat(4 / 10));
			//			callback(count);
			callback(getData);
		});
	},
	//根据合同id,展示所有未完成事件以及下一个待办事件
	/*
	 *id:合同id
	 *calback:回调返回数据
	 */
	checkUndoneEvents: function(id, callback) {

		Contract = this.model('Contract');
		var send = []; //用数组来存储未完成事件
		var j = 0; //未完成事件数组下标控制器
		var m = 0; //大于当前时间数组下标控制器
		var occur = new Date();
		var year = occur.getFullYear();
		var month = occur.getMonth() + 1;
		var day = occur.getDate(); ///
		day = day < 10 ? "0" + day : day;
		month = month < 10 ? "0" + month : month;
		var getOccur = year + "-" + month + "-" + day;
		//转换成标准时间格式
		var getTemp;
		var flag = 0;
		//找到第一个比当前执行日期大的事件标志位
		var canGet = 0;
		//存在下一步事件标志位
		var next;
		//存储下一步执行事件
		var willSend;
		//存储发送数据

		Contract.find({
			_id: id
		}, function(err, docs) {
			docs.forEach(function(doc) {
				for (var i = 0; i < doc.events.length; i++) { //遍历该合同数组
					if (doc.events[i].completed == false && doc.events[i].date < getOccur) {
						console.log(doc.events[i].date);
						console.log(getOccur);
						send[j] = doc.events[i]; //当状态为未完成状态,取出
						j++; //下标移动
					}
				}
				console.log(getOccur);
				for (var k = 0; k < doc.events.length; k++) {
					if (flag == 0 && (doc.events[k].date > getOccur || doc.events[k].date == getOccur) && doc.events[k].completed == false) {
						//找到第一个大于或等于当前时间的事件而且还没完成的事件
						getTemp = doc.events[k].date; //把该事件的执行日期赋给临时时间
						next = doc.events[k];
						flag = 1;
						canGet = 1;
					}
					if (flag == 1 && doc.events[k].date > getOccur && doc.events[k].date < getTemp && doc.events[k].completed == false) {
						//之后要是存在比当前时间大并且比临时时间小的而且还没完成的事件,更新临时时间,并且更新下一步执行事件
						getTemp = doc.events[k].date;
						next = doc.events[k];
					}
				}
				if (canGet == 0) {
					next = 0; //合同已经结束
				}
				willSend = {
					"name": doc.name,
					"undone": send,
					"next": next
				};
				console.log(willSend);
				callback(willSend);
			});
		});
	},
	//展示所有所有合同未完成事件以及下一个待办事件
	/*
	 *calback:回调返回数据
	 */
	checkAllUndoneEvents: function(uid,callback) {

		Contract = this.model('Contract');
		var send = []; //用数组来存储未完成事件
		var j = 0; //未完成事件数组下标控制器
		var m = 0; //大于当前时间数组下标控制器
		var s = 0; //合同待办事件数组下标控制器
		var occur = new Date(); //
		var year = occur.getFullYear();
		var month = occur.getMonth() + 1;
		var day = occur.getDate(); ///
		day = day < 10 ? "0" + day : day;
		month = month < 10 ? "0" + month : month;
		var getOccur = year + "-" + month + "-" + day;
		//转换成标准时间格式
		var getTemp;
		var flag = 0;
		//找到第一个比当前执行日期大的事件标志位
		var canGet = 0;
		//存在下一步事件标志位
		var next = { //初始化下步执行事件变量
			"id": 0,
			"title": 0,
			"date": 0,
			"price": 0,
			"completed": 0
		};
		var willSend;
		//存储单个合同数据
		var allWillSend = [];
		//存储所有合同数据

		Contract.find({uid:uid}, function(err, docs) {
			docs.forEach(function(doc) {
				for (var i = 0; i < doc.events.length; i++) { //遍历该合同数组
					if (doc.events[i].completed == false && doc.events[i].date < getOccur) {
						//						console.log(doc.events[i].date);
						//						console.log(getOccur);
						send[j] = doc.events[i]; //当状态为未完成状态,取出
						j++; //下标移动
					}
				}
				console.log(getOccur);
				for (var k = 0; k < doc.events.length; k++) {
					if (flag == 0 && (doc.events[k].date > getOccur || doc.events[k].date == getOccur) && doc.events[k].completed == false) {
						//找到第一个大于或等于当前时间的事件而且还没完成的事件
						getTemp = doc.events[k].date; //把该事件的执行日期赋给临时时间
						next = doc.events[k];
						flag = 1;
						canGet = 1;
					}
					if (flag == 1 && (doc.events[k].date > getOccur || doc.events[k].date == getOccur) && doc.events[k].date < getTemp && doc.events[k].completed == false) {
						//之后要是存在比当前时间大并且比临时时间小的而且还没完成的事件,更新临时时间,并且更新下一步执行事件
						getTemp = doc.events[k].date;
						next = doc.events[k];
					}
				}
				/*
				if (canGet == 0) {
					next = 0; //合同已经结束
				}
				*/
				willSend = {
					"name": doc.name,
					"_id": doc._id,
					"undone": send,
					"next": next
				};
				console.log(doc.name);
				console.log(next);
				allWillSend[s] = willSend;
				s++;
			});
			callback(allWillSend);
		});
	},
	/*模糊查询
	 *get:获取查询字符串
	 *callback:返回数据
	 */
	fuzzySearch: function(get, callback) {

		Contract = this.model('Contract');
		//
		var occur = new Date(); //
		var year = occur.getFullYear();
		var month = occur.getMonth() + 1;
		var day = occur.getDate(); ///
		day = day < 10 ? "0" + day : day;
		month = month < 10 ? "0" + month : month;
		var getOccur = year + "-" + month + "-" + day;
		//
		var send = [];
		var i = 0;
		var idFlag = 0;
		var nameFlag = 0;
		var remarkFlag = 0;
		var dateFlag = 0;
		var obj = JSON.parse(get); //转化成json
		if (obj.id == true)
			idFlag = 1;
		if (obj.name == true)
			nameFlag = 1;
		var q = new RegExp(obj.keyword); //所有以传入参数开始的
		var getBeginDate = obj.beginDate;
		var getEndDate = obj.endDate;
		if (getEndDate == "") {
			getEndDate = getOccur;
		}
		console.log(getEndDate);
		console.log(getOccur);
		if (idFlag == 1 && nameFlag == 1) {
			console.log("1");
			Contract.find({
				$and: [{
						beginDate: {
							$gte: getBeginDate,
							$lte: getEndDate
						}
					}, {
						beginDate: {
							$lte: getEndDate
						}
					}
				],
				$or: [{
						name: {
							'$all': [q]
						}
					}, {
						myId: {
							'$all': [q]
						}
					}, {
						partyA: {
							'$all': [q]
						}
					}, {
						partyB: {
							'$all': [q]
						}
					}
				]
			}, function(err, results1) {
				send[i] = results1;
				i++;
				callback(send);
			});
		}
		if (idFlag == 1 && nameFlag == 0) {
			console.log("2");
			Contract.find({
				$and: [{
						beginDate: {
							$gte: getBeginDate,
							$lte: getEndDate
						}
					}, {
						beginDate: {
							$lte: getEndDate
						}
					}
				],
				$or: [{
						myId: {
							'$all': [q]
						}
					}, {
						partyA: {
							'$all': [q]
						}
					}, {
						partyB: {
							'$all': [q]
						}
					}
				]
			}, function(err, results2) {
				send[i] = results2;
				i++;
				callback(send);
			});
		}
		if (idFlag == 0 && nameFlag == 1) {
			console.log("3");
			Contract.find({
				$and: [{
						beginDate: {
							$gte: getBeginDate,
							$lte: getEndDate
						}
					}, {
						beginDate: {
							$lte: getEndDate
						}
					}
				],
				$or: [{
						name: {
							'$all': [q]
						}
					}, {
						partyA: {
							'$all': [q]
						}
					}, {
						partyB: {
							'$all': [q]
						}
					}
				]
			}, function(err, results3) {
				send[i] = results3;
				i++;
				callback(send);
			});
		}
		if (idFlag == 0 && nameFlag == 0) {
			callback(send);
		}
	}

};



Repository.enhanceSchema(ContractSchema);


mongoose.model('Contract', ContractSchema); //创建新合同对象,数据库中对应contracs容器
mongoose.model('Template', ContractSchema); //创建合同模版对象,对应templates容器