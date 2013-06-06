//var mongodb = require('mongodb');
var dataModel = require('../models/dataModel');
var get = require('../models/getData');

/*
 * GET contracts listing.
 */
//////////////test code//////////////

//////////////test code//////////////
exports.list = function(req, res) {
  dataModel.checkTimeOf(function(data) {
    console.log(data);
    if (data != null)
      res.send(data);
  });
};

exports.show = function(req, res) {
  res.send("respond with a resource");
};

exports.create = function(req, res) {
  //  console.log(req.body);
  /*  var name = req.param('UserName');
  var number = req.param('UserNumber');
  //  console.info(req.param('UserName'));
  //  console.info(req.param('UserNumber'));
  getData = {
    UserName: name,
    UserNumber: number
  };*/
  /*
  dataModel.checkTimeOf(function(data) {
    console.log("2: " + data);
  });
  dataModel.checkData(function(data) {
    console.log(data);
  });*/
  dataModel.showData(function(data) {
    console.log(data);
  });
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