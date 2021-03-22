const mongoose = require(`mongoose`);
const passportLocalMongoose = require(`passport-local-mongoose`);

const UserForm = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    require: true,
  },
  sex: {
    type: String,
    require: true,
  },
});

UserForm.plugin(passportLocalMongoose);

const Users = mongoose.model(
  `Users`,
  UserForm,
  console.log(`user model loaded`)
);

module.exports = Users;
