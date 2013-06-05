//数据接受点,接收来自浏览器发回来的数据
var getData = "hello world"; //存储接收数据
var data1 = {
	Id: "CA123",
	businessname: "XX商务合同",
	events: [{
			name: "竞标",
			date: "2013-05-20",
			complete: false
		}, {
			name: "首款",
			date: "2013-08-10",
			remark: "务必收到",
			complete: false
		}, {
			name: "二期收款",
			date: "2013-09-20",
			price: "30000",
			complete: false
		}, {
			name: "收取尾款",
			date: "2013-12-20",
			complete: false
		}, {
			name: "合同结束",
			date: "2013-12-20",
			complete: false
		}
	]
};
var data2 = {
	Id: "BD123",
	businessname: "YY商务合同",
	events: [{
			name: "竞标",
			date: "2013-05-05",
			complete: false
		}, {
			name: "首款",
			date: "2013-06-20",
			remark: "两方协议签署,务必收到30%金额",
			complete: false
		}, {
			name: "二期收款",
			date: "2013-09-20",
			price: "30000",
			complete: false
		}, {
			name: "收取尾款",
			date: "2013-10-20",
			complete: false
		}, {
			name: "合同结束",
			date: "2014-01-20",
			complete: false
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