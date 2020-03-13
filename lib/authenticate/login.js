module.exports = (ctx) => {
  const { app, passport, LocalStrategy, db } = ctx;
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'passwd'
  },
    function(username, password, done) {
      // ...
    }
  ));
  app.get('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.json({message: "josiah"})}
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.redirect('/users/' + user.username);
      });
    })(req, res, next);
  });}
