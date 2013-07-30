/*
 *  Generic require log routing middleware
 */

var async = require('async'),
  mongoose = require('mongoose'),
  Contract = mongoose.model('Contract'),
  Log = mongoose.model('Log');



exports.show = function(req, res, next) {
  console.log("recording...");
  var logger = new Log();
  var contract = new Contract();
  var logData = {
    url: req._parsedUrl.path, //完整的URL
    user: req.user.username, //用户名
    time: req._startTime, //时间
    operation: req.route.method, //操作类型
    data: req.body, //操作数据
    resource: req.route.path //资源路径
  };
  logger.insertRecord(logData, function(data) {
    console.log(data);
  });
  next();
  /*
   *获取resource operation time user
   *写入数据库
   */
};