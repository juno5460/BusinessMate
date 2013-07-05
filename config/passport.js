var passport = require('passport'),
  mongoose = require('mongoose'),
  LocalStrategy = require('passport-local').Strategy,
  User = mongoose.model('User');


module.exports = function(passport, config) {
  // require('./initializer')

  // serialize sessions
  passport.serializeUser(function(user, done) {
    console.log("serializeUser");
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    console.log("deserializeUser");
    User.findOne({
      _id: id
    }, function(err, user) {
      done(err, user);
    });
  });
  passport.use(new LocalStrategy(function(username, password, done) {
    console.log("LocalStrategy");
    User.findOne({
      userName: username
    }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, {
          message: 'Incorrect username.'
        });
      }
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Incorrect password.'
        });
      }
      return done(null, user);
    });
  }));
};