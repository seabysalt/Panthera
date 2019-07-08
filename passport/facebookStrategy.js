const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User');
const bcrypt = require('bcrypt');

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/facebook/callback",
      profileFields: ['id', 'displayName', 'name', 'gender', 'picture.type(large)']
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile)
      User.findOne({ facebookId: profile.id })
        .then(user => {
          if (user) return done(null, user);

          return User.create({
            facebookId: profile.id,
            fullName: profile.displayName,
            firstName: profile.displayName.split(" ")[0],
            lastName: profile.displayName.split(" ")[1],
            profilePicture: profile.photos ? profile.photos[0].value : 'Not found'
          }).then(newUser => {
            return done(null, newUser);
          });
        })
        .catch(err => {
          done(err);
        });
    }
  )
);
