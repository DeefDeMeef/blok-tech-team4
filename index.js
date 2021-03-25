const express = require(`express`);
const path = require(`path`);
require(`./controllers/connection`);
const app = express();
const urlencoded = express.urlencoded({ extended: true });
const flash = require(`connect-flash`);
const session = require(`express-session`);
const passport = require(`passport`);

app.use("/static", express.static(path.join(__dirname, '/static'))).use(urlencoded);

app.set(`view engine`, `ejs`);
// session gegevens meegeven/ installen
app.use(
  session({
    cookie: { maxAge: 60000 },
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(flash());

// passport
app.use(passport.initialize());
app.use(passport.session());

// flash messages
app.use(flash());

// add message(s) on locals.
app.use((req, res, next) => {
  res.locals.messages = req.flash(`success`);
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

// chat routes
const chatRoutes = require(`./routes/chatRoutes`);
app.use(chatRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.use((req, res) => {
  res.status(404).send(`does not exist`);
});
