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
  userModel.connectDb(); //XXXXXXXXXX一定得要开启数据库
  /*********************************
    userModel.insertData(contractData1);
 /***********************************/
  /************************************
userModel.updateSymble("CA123","合同结束",function(data){
    res.send(data);
  });
/*************************************/
  /**************************************
userModel.updateData(function(data){
   res.send(data);
});
/*************************************/
  /***********************************
  userModel.checkInfo(function(data) {
    console.log('hello');
    res.send(data);
  });
  /**********************************/
};
exports.show = function(req, res) {
  console.log("啊啊啊啊啊啊啊啊" + req.params['contract']);
  console.log("show");
  userModel.connectDb();
  var getId = {
    cid: req.params['contract']
  };
  console.log(getId);
  userModel.checkIdData(getId, function(data) {
    res.send(data);
  });
};
exports.create = function(req, res) {
  console.log("create");
  userModel.connectDb();
  var rdata = req.body;
  console.log(rdata);
  userModel.insertData(rdata);
};

exports.update = function(req, res) {
  console.log("update");
  userModel.connectDb();
  //    var getId = req.body.cid;
  //    var getNew = req.body[0];
  var getId = "12548956837657480000";
  var getNew = {
    "cid": "12548956837657480000",
    "id": "CS033022112",
    "businessName": "南航统一移动平台1111",
    "state": "回款",
    "beginDate": "2013-01-02",
    "endDate": "2014-05-03",
    "events": [{
        "remark": "时间一时间一时间一11111",
        "date": "2013-06-09",
        "title": "时间一",
        "id": "0"
      }, {
        "price": "888",
        "remark": "时间2时间2时间2时间2",
        "date": "2013-06-09",
        "title": "时间2",
        "id": "1"
      }
    ]
  };
  console.log(getId);
  console.log(getNew);
  userModel.updateIdData(getId, getNew, function(data) {
    res.send(data);
  });
  /*
  userModel.updateSymble(option, result, function(data) {
    res.send(data);
  });
*/
};

exports.destroy = function(req, res) {
  dataModel.removeDoc({
    id: "CA123"
  }, function(data) {
    res.send(data);
  });
};