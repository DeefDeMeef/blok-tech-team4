const express = require(`express`);
require('./controllers/connection')
const app = express();

//Profile routes
const profileRoutes = require('./routes/profileRoutes');
app.use(profileRoutes);
app.use(express.static(`static`));
//Login routes
const loginRoutes = require('./routes/loginRoutes');
app.use(loginRoutes);
app.set(`view engine`, `ejs`);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});