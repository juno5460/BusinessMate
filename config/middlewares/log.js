var async = require('async'),
  mongoose = require('mongoose'),
  Contract = mongoose.model('Contract'),
  Log = mongoose.model('Log');



exports.record = function(req, res, next) {
  console.log("recording...");
  var logger = new Log();
  var contract = new Contract();
  var logData = {
    resource: req.route.path, //操作对象
    user: req.user.username, //用户名
    time: req._startTime, //时间
    operation: req.route.method, //操作类型
    data: req.body
  };
  console.log(logData);
  console.log(logData.data.events);
  logger.insertRecord(logData,function(data){
    console.log(data);
  });
  next();
  /*
   *获取resource operation time user
   *写入数据库
   */
};