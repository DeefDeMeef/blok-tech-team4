require(`dotenv/config`);
const express = require('express');
const router = express.Router();
const app = express();
const flash = require(`express-flash`);
const session = require(`express-session`);

const magIk = (request, response, next) => {
  if (request.isAuthenticated()) {
    return next();
  }
  request.flash(`error`);
  response.redirect(`login`);
};
// flash ophalen
app.use(flash());

// routes: register_get, register_post, login_get, login_post, 
// routes
app.get(`/login`, (request, response) => {
    response.render(`login`);
  });
  
  app.get(`/register`, (request, response) => {
    response.render(`register`);
  });

  app.get(`*`, (request, response) => {
    response.send(`NOPE 404`, 404);
  });
  
  app.get(`/`, magIk, (request, response) => {
    response.render(`index`, {
      name: request.user.name
    });
  });

  app.get(`/logout`, (request, response) => {
    request.logout();
    response.redirect(`login`);
  });


  // path
  const path = require(`path`);
  // body parser - voor post requests
  const bodyParser = require(`body-parser`);
  
  // database Model
  const User = require(`../models/user`);
  
  const bcrypt = require('bcrypt');
  
  // passport - initialize is wat er meegenomen moet worden in de sessie
  const passport = require(`passport`);
  const initializePassport = require(`../controllers/passport-config`);
  initializePassport(
    passport,
    username => users.find(user => user.username === username),
    id => users.find(user => user.id === id)
  );
  
  // flash
  
  // session gegevens meegeven/ installen
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false
    })
  );
  
  // passport
  app.use(passport.initialize());
  app.use(passport.session());
  
  
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
  
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: false
    })
  );
  
  app.post(`/registered`, async (request, response) => {
    try {
      request.body.password = bcrypt.hashSync(request.body.password, 10);
      const user = new User(request.body);
      console.log(request.body);
      const result = await user.save();
      response.redirect(`login`);
    } catch (error) {
      response.status(500).send(error);
    }
  });
  
  app.post(
    `/login`,
    passport.authenticate(`local`, {
      successRedirect: `/`,
      failureRedirect: `/login`,
      failureFlash: true
    })
  );

  // app.post(`/delete`, async (request, response) => {
//   try {
//     const user = await User.findOneAndDelete({
//       username: request.body.username
//     }).exec();
//     if (!user) {
//       return response.
//         status(400).
//         send({ message: `De gebruikersnaam bestaat niet` });
//     }
//     response.redirect(`register`);
//   } catch (error) {
//     response.status(500).send(error);
//   }
// });

// app.post(`/change`, magIk, async (request, respond) => {
//   try {
//     request.body.password = bcrypt.hashSync(request.body.password, 10);
//     const filter = { username: request.user.username };
//     const user = await User.findOne({ username: request.user.username });
//     await User.updateOne(filter, { password: request.body.password });
//     await user.save().then(() => {
//       respond.redirect(`/`);
//     });
//   } catch {
//     respond.status(500).send();
//   }
// });



  module.exports = router;