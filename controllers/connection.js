require(`dotenv/config`);
const mongoose = require(`mongoose`);
const uri = process.env.DB_HOST;
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

