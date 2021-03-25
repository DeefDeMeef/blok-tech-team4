const express = require(`express`);
const path = require('path');
require(`./controllers/connection`);
const app = express();
const urlencoded = express.urlencoded({ extended: true });
const flash = require('connect-flash');
const session = require('express-session');

app.use(session({ cookie: { maxAge: 60000 }, 
                  secret: 'woot',
                  resave: false, 
                  saveUninitialized: false}));

app.use("/static", express.static(path.join(__dirname, '/static'))).use(urlencoded);

app.set(`view engine`, `ejs`);

// flash messages
app.use(flash());

// Add message(s) on locals.
app.use(function (req, res, next) {
  res.locals.messages = req.flash("success");
  next();
});

// profile routes
const profileRoutes = require(`./routes/profileRoutes`);
app.use(profileRoutes);

// mailer routes
const mailerRoutes = require(`./routes/mailerRoutes`);
app.use(mailerRoutes);

// filter routes
const filterRoutes = require(`./routes/filterRoutes`);
app.use(filterRoutes);

// login routes
const loginRoutes = require(`./routes/loginRoutes`);
app.use(loginRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.use((req, res) => {
  res.status(404).send(`does not exist`);
});
