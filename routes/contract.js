var dataModel = require('../models/mongoDataModel');
var userModel = require('../models/mongooseDataModel');
var get = require('../models/getData');
var mongoose = require('mongoose');

var contractData1 = get.returnData1(); //获取数据源
var contractData2 = get.returnData2();

////
/*
var mongodb = require('mongodb');
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
var db = new Db("Daniel", new Server("127.0.0.1", 27017, {}), {
  w: 1
});
var newCollection = db.collection("users3");
*/

/*
 * GET contracts listing.
 */
//////////////test code//////////////
exports.index = function(req, res) {
  /**************连接数据库操作********/
  userModel.connectDb();
//  userModel.insertData(contractData2);
userModel.updateSymble('CA123','二期收款',function(data){
    res.send(data);
  });
/***********************************
 userModel.checkInfo(function(data){
    res.send(data);
  });
  /**********************************/
};
exports.index1 = function(req, res) {
  var getTime;
  var getCondition;
  var info;
  var db=dataModel.connect();
  var newCollection=dataModel.collection();
  /******************修改完成标志位测试***********************
  var id = {
    Id: "CA123"
  };
  var option = {
    Id: "CA123",
    "events.name":"合同结束"
    ///不要用完全事件键值来匹配,这样的话会导致事件必须得完整拿出来,不然会找不到.
    //events: {name: "收取尾款",date: "2013-12-20",complete: false}
  };
  var result = {
    "events.$.complete": true
  };
  dataModel.updateSymble(id, option, result, function(data) {
    res.send(data);
  });
  /************************pass*****************************/
  /********************追踪合同状态测试**********************
  dataModel.checkCondition({Id:"CA123"},function(data) {
    res.send(data);
  });
  /************************pass*****************************/
  /***********************展示详细合同测试************************
  dataModel.showData(function(data) {
    res.send(data);
  });
  /************************pass*****************************???????
  db.open(function(req, res1) {
    dataModel.showData(function(data) {
      res.send(data);
      data1=data;
      console.log(data);
      db.close();
    });
  });
  /*******************跟踪开始结束日期测试**********************
  dataModel.checkTimeOf({
    Id: "CA123"
  }, function(data) {
    res.send(data);
  });
  /**************************pass****************************/
  /************************查询合同测试************************
  dataModel.checkData({
    id: "123"
  }, function(data) {
    res.send(data);
  });
  /**************************pass***************************/
  /************************删除合同测试***********************
  dataModel.removeDoc({
    Id: "CA123"
  }, function(data) {
    res.send(data);
  });
  /***************************pass***************************/
  /************************添加合同测试************************
  var rdata = get.returnData1();
  dataModel.insertDoc(rdata, function(data) {
    console.log("good1");
  });

  //    res.send(data);
  /***************************pass***************************/
  /************************添加事件测试************************
  var id = {
    Id: "CA123"
  };
  var events = {
    events: {
      "name": "一次竞标",
      "date": "2013-6-20",
      "complete": false
    }
  };
  dataModel.addEvent(id, events, function(data) {
    res.send(data);
  });
  /***************************pass***************************/
  /************************删除事件测试************************
  var id = {
    Id: "CA123"
  };
  var events = {
    events: {
      "name": "一次竞标"
      //      "date": "2013-6-20",
      //      "complete": false
    }
  };
  dataModel.deleteEvent(id, events, function(data) {
    res.send(data);
  });
  /***************************pass***************************/
  /************************计算合同数目测试********************
  dataModel.countDoc(function(data) {
    res.send(data + "");
  });
  /***************************pass***************************/
  /************************查询合同名字测试********************
  dataModel.checkName({id:"123"},function(data) {
    res.send(data);
  });
  /***************************pass***************************/
  /************************展示所有合同测试********************
  dataModel.showAllInfo(function(data) {
    res.send(data);
  });
  /***************************pass***************************/
  /************************展示合同信息测试********************
  dataModel.showInfo({
    Id: "CA123"
  }, function(data) {
    res.send(data);
  });
  /***************************No pass***************************/
};
exports.show = function(req, res) {
  console.log("啊啊啊啊啊啊啊啊" + req.params['contract']);
  dataModel.showData(function(data) {
    res.send(data);
  });
};
exports.create = function(req, res) {
  userModel.connectDb();
  var rdata = req.body;
  userModel.insertData(rdata);
};

exports.update = function(req, res) {
  var option = {
    Id: "CA123",
    events: {
      name: "收取尾款",
      date: "2013-11-20",
      complete: false
    }
  };
  var result = {
    "events.$.complete": "2013-11-20"
  };
  dataModel.updateSymble(option, result, function(data) {
    res.send(data);
  });
};

exports.destroy = function(req, res) {
  dataModel.removeDoc({
    Id: "CA123"
  }, function(data) {
    res.send(data);
  });
};