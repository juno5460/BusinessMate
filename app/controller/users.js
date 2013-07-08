/**
 * Module dependencies.
 */

var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  generator = require('../generator/generator');

exports.signin = function(req, res) {};

/**
 * Auth callback
 */

exports.authCallback = function(req, res, next) {
  res.redirect('/');
};

/**
 * Show login form
 */

exports.login = function(req, res) {
// console.log(req.user);
 return res.redirect('/desktop');
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
  console.info("badboy:"+req.user);
//  res.redirect('/desktop');
  res.send(generator.generate('editContract', {
      _id: req.params.id
    }));
};

/**
 * Create user
 */

exports.create = function(req, res) {
  var user = new User(req.body);
 // console.log(user);
  //  user.provider = 'local';
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
      console.log("Enter Login function",user.email);
      return res.redirect('/api/contracts');
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

/*
 exports.create = function(req, res) {
  var user = new User();
  var rdata = req.body;
  user.getUnique(function(data) {
    var getData = {
      uid: data,
      userName: rdata.userName,
      email: rdata.email,
      password: rdata.password
    };
    console.log(getData);
    user.insertUserData(getData);
  });
};
*/