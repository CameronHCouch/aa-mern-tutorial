const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('../config/keys');

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// check secretOrKey stored in keys.js
options.secretOrKey = keys.secretOrKey;

// exports set up as anonymous function
// done keyword signifies that passport middleware has completed its task
// there is also a "next" keyword for middleware that performs a similar function
module.exports = passport => {
  passport.use(new JwtStrategy(options, (jwt_payload, done) => {
    // could use User.findOne( { id: jwt_payload.sub })
    User.findById(jwt_payload.id)
      .then(user => {
        if (user) {
          return done(null, user);
        }

        return done(null, false);
      })
      .catch(err => console.log(err));
  }));
};