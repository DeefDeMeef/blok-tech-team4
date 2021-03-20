require(`dotenv/config`);
const express = require(`express`);
const mongoose = require(`mongoose`);
const app = express();
const uri = process.env.DB_HOST;

//Profile routes
// const profileRoutes = require('./routes/profileRoutes');
// app.use(profileRoutes);
app.use(express.static(`static`));
//Login routes
const loginRoutes = require('./routes/loginRoutes');
app.use(loginRoutes);
app.set(`view engine`, `ejs`);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

mongoose.
  connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).
  then(() => {
    console.log(`connected to mongo`);
  }).
  catch(err => {
    console.log(err);
  });



