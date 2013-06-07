var dataModel = require('../models/dataModel');
var get = require('../models/getData');

/*
 * GET contracts listing.
 */
//////////////test code//////////////
exports.index = function(req, res) {
  /******************修改完成标志位测试***********************
  var id = {
    Id: "CA123"
  };
  var option = {
    Id: "CA123",
    events: {
      name: "收取尾款",
      date: "2013-12-20",
      complete: false
    }
  };
  var result = {
    "events.$.complete": true
  };
  dataModel.updateSymble(id, option, result, function(data) {
    res.send(data);
  });
  /************************pass*****************************/
  /********************追踪合同状态测试**********************/
  dataModel.checkCondition({Id:"CA123"},function(data) {
    res.send(data);
  });
  /************************pass*****************************/
  /***********************展示合同测试************************
  dataModel.showData(function(data) {
    res.send(data);
  });
  /************************pass*****************************/
  /*******************跟踪开始结束日期测试**********************
  dataModel.checkTimeOf({
    Id: "BD123"
  }, function(data) {
    res.send(data);
  });
  /**************************pass****************************/
  /************************查询合同测试************************
  dataModel.checkData({
    Id: "BD123"
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
    res.send(data);
  });
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
};
exports.show = function(req, res) {
  console.log("啊啊啊啊啊啊啊啊" + req.params['contract']);
  dataModel.showData(function(data) {
    res.send(data);
  });
};
exports.create = function(req, res) {
  var rdata = req.body;
  dataModel.insertDoc(rdata, function(data) {
    res.send(data);
  });
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