const express = require(`express`);
require('./controllers/connection')
const app = express();

6d0cbd26aa3a0f61f3f9900617c55fd22888463e

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
6d0cbd26aa3a0f61f3f9900617c55fd22888463e
