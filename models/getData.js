//数据接受点,接收来自浏览器发回来的数据
var getData = "hello world"; //存储接收数据
var data1 = {
	id: "CA123",
	businessName: "XX商务合同",
	beginDate:"2013-06-20",
	endDate:"2014-06-18",
	events: [{
			name: "竞标",
			date: "2013-05-20",
			completed: false
		}, {
			name: "首款",
			date: "2013-08-10",
			remark: "务必收到",
			completed: false
		}, {
			name: "二期收款",
			date: "2013-09-20",
			price: "30000",
			completed: false
		}, {
			name: "收取尾款",
			date: "2013-12-20",
			completed: false
		}, {
			name: "合同结束",
			date: "2013-12-20",
			completed: false
		}
	],
	state:"二期收款"
};
var data2 = {
	id: "BD123",
	businessName: "YY商务合同",
	beginDate:"2013-04-20",
	endDate:"2014-02-18",
	events: [{
			name: "竞标",
			date: "2013-05-05",
			completed: false
		}, {
			name: "首款",
			date: "2013-06-20",
			remark: "两方协议签署,务必收到30%金额",
			completed: false
		}, {
			name: "二期收款",
			date: "2013-09-20",
			price: "30000",
			completed: false
		}, {
			name: "收取尾款",
			date: "2013-10-20",
			completed: false
		}, {
			name: "合同结束",
			date: "2014-01-20",
			completed: false
		}
	]
};
exports.returnData1 = function() {
	return data1;
};
exports.returnData2 = function() {
	return data2;
};
//解析接收数据接口
exports.create = function(req, res) {
	res.send("respond with a resource");
};
///处理数据,
exports.dealData = function(getData) {
	res.send("respond with a resource");
};