/*
 *  Generic require login routing middleware
 */
var async = require('async'),
  mongoose = require('mongoose'),
  Contract = mongoose.model('Contract');

exports.requiresLogin = function(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  next();
};

/*
 *  User authorizations routing middleware
 */

exports.record = function(req, res, next) {
  console.log("recording...");
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
  // log.insertRecord(logData,function(data){
  //   console.log(data);
  // });
  next();
  /*
   *获取resource operation time user
   *写入数据库
   */
};

/*
 *  User authorizations routing middleware
 */

exports.user = {
  hasAuthorization: function(req, res, next) {
    if (req.profile.id != req.user.id) {
      return res.redirect('/users/' + req.profile.id);
    }
    next();
  }
};


/*
 *  Article authorizations routing middleware
 */

exports.article = {
  hasAuthorization: function(req, res, next) {
    if (req.article.user.id != req.user.id) {
      return res.redirect('/articles/' + req.article.id);
    }
    next();
  }
};