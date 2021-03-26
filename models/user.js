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
  birthdate: {
    type: String,
    require: true,
  },
  sex: {
    type: String,
    require: true,
  },
  profileId: {
    type: String,
    require: true,
    default: undefined,
  },
});

// userForm.plugin(passportLocalMongoose);

module.exports = mongoose.model(
  `user`,
  UserForm,
  console.log(`user model loaded`)
);
