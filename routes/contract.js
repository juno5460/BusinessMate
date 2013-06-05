//var mongodb = require('mongodb');
var dataModel = require('../models/dataModel');
var get = require('../models/getData');

/*
 * GET contracts listing.
 */
//////////////test code//////////////

//////////////test code//////////////
exports.list = function(req, res) {
  res.send("respond with a resource");
};

exports.show = function(req, res) {
  res.send("respond with a resource");
};

exports.create = function(req, res) {
  var name = req.param('UserName');
  var number = req.param('UserNumber');
  getData = {
    UserName: name,
    UserNumber: number
  };
  var yesterday = "2013-06-02";
  var today = "2013-06-03";
  var yes = new Date(yesterday);
  var tod = new Date(today);
  if (yes > tod)
    console.log("It's unreasonable");
  else if (yes < tod)
    console.log("It's right");
  else
    console.log("Nope");
  var option = {
    Id: "CA123",
    Events: {
      eventName: "收取尾款",
      cdate: "2013-12-20",
      symble: false
    }
  };
  var result = {
    "Events.$.symble": true
  };
  /////////test
  //  console.log(get.returnData());
  //  dataModel.checkData(); //查询文档测试
  //  dataModel.insertDoc(); //插入文档测试
  //  dataModel.allDoc();    //计算合同总数
  //  dataModel.getDoc(); //计算符合条件的合同数目
  //  dataModel.showData(); //展示合同详情
  //  updateData();  //修改一个文档
  //   dataModel.updateSymble(option, result);
  //  removeEvent(); //删除一个事件
  //  addEvent();   //添加一个事件
  //  removeDoc(); //删除文档测试
  // dataModel.checkTimeOf();
  var time;
  console.log("time:" + dataModel.checkTimeOf(time));
  //  console.info(req.param('UserName'));
  //  console.info(req.param('UserNumber'));
  res.send("respond with a resource");
};

exports.update = function(req, res) {
  res.send("respond with a resource");
};
exports.drop = function(req, res) {
  res.send("respond with a resource");
};
/*
exports.destroy = function(req, res) {
  res.send("respond with a resource");
};
*/