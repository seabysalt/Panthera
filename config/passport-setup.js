const passport = require("passport")
const FacebookStrategy = require("passport-facebook").Strategy
const User = require('../models/User')

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        })
        .catch(err => {
            done(err);
        });
});
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