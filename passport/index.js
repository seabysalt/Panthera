const passport = require('passport');

require('./serializers');
require('./facebookStrategy');
require('./localStrategy');


module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());
}
