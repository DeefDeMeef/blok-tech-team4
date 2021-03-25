const express = require(`express`);
require(`./controllers/connection`);
const app = express();
const urlencoded = express.urlencoded({ extended: true });
const User = require(`./models/user`);
const magIk = require(`./controllers/authentication`);
const flash = require(`express-flash`);
const session = require(`express-session`);
const passport = require(`passport`);
app.use(express.static(`static`)).use(urlencoded);

app.set(`view engine`, `ejs`);
// session gegevens meegeven/ installen
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(flash());

// passport
app.use(passport.initialize());
app.use(passport.session());

// profile routes
const profileRoutes = require(`./routes/profileRoutes`);
app.use(profileRoutes);

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
