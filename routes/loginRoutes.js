require(`dotenv/config`);
const express = require(`express`);
const app = express();
const flash = require(`express-flash`);
const session = require(`express-session`);
require(`../controllers/connection`);
const profileController = require(`../controllers/profileController`);

// path
const path = require(`path`);

// body parser - voor post reqs
const bodyParser = require(`body-parser`);

// database Model
const User = require(`../models/user`);

try {
  User.collection.findOne(
    {
      email: `davey@test.nl`,
    },
    async (err, obj) => {
      if (!obj) {
        console.log(`Bestaat niet!`);
      } else {
        console.log(`Bestaat jonge!`);
      }
    }
  );
} catch (error) {
  console.log(error);
}

const bcrypt = require(`bcrypt`);

// passport - initialize is wat er meegenomen moet worden in de sessie
const passport = require(`passport`);
const initializePassport = require(`../controllers/passport-config`);
initializePassport(
  passport,
  (email) => users.find((user) => user.email === email),
  (id) => users.find((user) => user.id === id)
);

// flash
const magIk = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash(`error`);
  res.redirect(`/login`);
};

// routes
app.get(`/login`, (req, res) => {
  res.render(`login`);
});

app.get(`/register`, (req, res) => {
  res.render(`register`);
});

app.get(`/`, magIk, async (req, res) => {
  console.log(req.user._id);
  req.session.userEmail = req.user.email;
  const loggedUser = await User.findOne({ email: req.session.email });
  console.log(loggedUser);
  // eslint-disable-next-line no-negated-condition
  try {
    if (loggedUser.profile) {
      res.redirect(`/profile/${req.user._id}`);
    } else {
      res.redirect(`profile/create`);
    }
  } catch (err) {
    console.log(err);
  }
});

app.get(`/logout`, (req, res) => {
  req.logout();
  res.redirect(`login`);
});

app.get(`/chat`, magIk, async (req, res) => {
  try {
    // vind de gebruiker die inlogd is
    await User.find(
      { email: req.session.userEmail },
      `_id email`,
      async (err, obj) => {
        console.log(obj);
        if (obj) {
          // vind alle gebruikers != ingelogde user
          await User.find(
            { email: { $ne: req.session.userEmail } },
            `_id email `,
            async (err, obj2) => {
              console.log(obj2);
              res.render(`chat`, {
                title: `chat`,
                name: req.session.userEmail,
                otherUsers: obj2,
              });
            }
          );
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
});

app.get(`*`, (req, res) => {
  res.send(`NOPE 404`, 404);
});

app.post(`/registered`, async (req, res) => {
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const user = new User(req.body);
    console.log(req.body);
    const result = await user.save();
    res.redirect(`login`);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post(
  `/login`,
  passport.authenticate(`local`, {
    successRedirect: `/`,
    failureRedirect: `/login`,
    failureFlash: true,
  })
);

/*
 * app.post(`/delete`, async (req, res) => {
 *   try {
 *     const user = await User.findOneAndDelete({
 *       username: req.body.username
 *     }).exec();
 *     if (!user) {
 *       return res.
 *         status(400).
 *         send({ message: `De gebruikersnaam bestaat niet` });
 *     }
 *     res.redirect(`register`);
 *   } catch (error) {
 *     res.status(500).send(error);
 *   }
 * });
 */

/*
 * app.post(`/change`, magIk, async (req, respond) => {
 *   try {
 *     req.body.password = bcrypt.hashSync(req.body.password, 10);
 *     const filter = { username: req.user.username };
 *     const user = await User.findOne({ username: req.user.username });
 *     await User.updateOne(filter, { password: req.body.password });
 *     await user.save().then(() => {
 *       respond.redirect(`/`);
 *     });
 *   } catch {
 *     respond.status(500).send();
 *   }
 * });
 */

module.exports = app;
