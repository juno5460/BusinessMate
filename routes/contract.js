//var mongodb = require('mongodb');
var dataModel = require('../models/dataModel');
var get = require('../models/getData');

/*
 * GET contracts listing.
 */
//////////////test code//////////////

//////////////test code//////////////
exports.index = function(req, res) {
  dataModel.showData(function(data) {
    res.send(data);
  });
  res.send("index");
  /*
  dataModel.checkTimeOf({
    Id: "CA123"
  }, function(data) {
    res.send(data);
  });
*/
};

exports.show = function(req, res) {
  console.log("啊啊啊啊啊啊啊啊" + req.params['contract']);
  dataModel.showData(function(data) {
    res.send(data);
  });
  res.send("show");
};

exports.create = function(req, res) {
  var rdata = req.body;
  dataModel.insertDoc(rdata, function(data) {
    res.send(data);
  });
  res.send("create");
};

exports.update = function(req, res) {
  dataModel.showData(function(data) {
    res.send(data);
  });
  res.send("update");
};

exports.destroy = function(req, res) {
  dataModel.removeDoc({
    Id: "CA123"
  }, function(data) {
    res.send(data);
  });
  res.send("destroy");
};