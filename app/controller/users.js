/**
 * Module dependencies.
 */

var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  generator = require('../generator/generator'),
  util = require('../util/common');

exports.signin = function(req, res) {};

/**
 * Auth callback
 */

exports.authCallback = function(req, res, next) {
  res.redirect('/');
};


/**
 * check username
 */

exports.check = function(req, res) {
  var user = new User();
  console.log(req.body.username);
  user.checkUsername(req.body.username, function(data) {
    console.log(data);
    if (data != "")
      res.send("false");
    else
      res.send("true");
  });
};

/**
 * Show login form
 */

exports.login = function(req, res) {

  console.log('login', req.user);
  if (req.user != null || req.user != undefined) {
    return res.redirect('/desktop');
  } else {
    res.send(generator.generate('login', {
      username: 'Justin'
    }));
  }
};
/**
 * Show sign up form
 */

exports.signup = function(req, res) {
  res.send(generator.generate('login', {
    username: 'Justin'
  }));
};

/**
 * Logout
 */


exports.logout = function(req, res) {
  req.logout();
  res.redirect('/login');
};

/**
 * Session
 */

exports.session = function(req, res) {
  console.info("badboy:" + req.user);
  res.redirect('/desktop');
};

/**
 * Create user
 */

exports.create = function(req, res) {
  console.log(req.body);
  if (req.body['password'] != req.body['password2']) {
    req.flash("password error");
    return res.redirect('/login');
  }
  var rdata = req.body;
  var user = new User();
  user.getUnique(function(data) { //生成唯一用户id
    console.log(data);
    var getData = {
      uid: data,
      username: rdata.username,
      email: rdata.email,
      password: rdata.password
    };
    user = new User(getData);
    user.save(function(err) {
      if (err) {
        return res.send(generator.generate('login', {
          username: 'Justin'
        }));
      }
      req.logIn(user, function(err) {
        if (err) {
          return 0;
        }
        return res.redirect('/desktop');
      });
    });
  });
};

/**
 *  Show profile
 */

exports.show = function(req, res) {
  var user = req.profile;
  res.render('users/show', {
    title: user.name,
    user: user
  });
};

/**
 * Find user by id
 */

exports.user = function(req, res, next, id) {
  User
    .findOne({
    _id: id
  })
    .exec(function(err, user) {
    if (err) return next(err);
    if (!user) return next(new Error('Failed to load User ' + id));
    req.profile = user;
    next();
  });
};