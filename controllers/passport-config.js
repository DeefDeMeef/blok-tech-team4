const LocalStrategy = require(`passport-local`).Strategy;
const Bcrypt = require(`bcrypt`);
const passport = require(`passport`);
const User = require(`../models/user`);

module.exports = (passport) => {
  passport.use(
    new LocalStrategy(
      { usernameField: `email` },
      (email, password, done) => {
        User.findOne({ email })
          .then((user) => {
            if (!user) {
              return done(null, false, {
                message: `Gebruikersnaam is verkeerd!`,
              });
            }
            Bcrypt.compare(password, user.password, (err, isMatch) => {
              if (err) {
                throw err;
              }

              if (isMatch) {
                return done(null, user);
              }
              return done(null, false, {
                message: `Het wachtwoord klopt niet!`,
              });
            });
          })
          .catch((err) => console.log(err));
      }
    )
  );
};

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
