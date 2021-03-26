require(`dotenv/config`);
const express = require(`express`);
const app = express();
const flash = require(`express-flash`);
const session = require(`express-session`);
require(`../controllers/connection`);
const profileController = require(`../controllers/profileController`);
const chatController = require('../controllers/chatController')

// path
const path = require(`path`);
// body parser - voor post reqs
const bodyParser = require(`body-parser`);

// database Model
const User = require(`../models/user`);
const Profile = require(`../models/userProfile`);

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

// flash ophalen
app.use(flash());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

// routes
app.get(`/login`, (req, res) => {
  res.render(`login`);
});

app.get(`/register`, (req, res) => {
  res.render(`register`);
});

app.get(`/`, magIk, (req, res) => {
  req.session.userEmail = req.user.email;
  res.render(`index`, {
    title: `Dashboard`,
    name: req.session.userEmail,
  });
});

app.get(`/logout`, (req, res) => {
  req.logout();
  res.redirect(`login`);
});

app.get('/chat', magIk, chatController.chatWindow)

app
  .get(`/profile/create`, magIk, profileController.getCreateProfile)
  .get(`/profile/:profileId`, magIk, profileController.getProfile)
  .get(`/edit/:profileId`, magIk, profileController.editProfile);

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
