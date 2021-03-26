const mongoose = require(`mongoose`);
const passportLocalMongoose = require(`passport-local-mongoose`);

const UserProfile = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  sport: {
    type: String,
  },
  bio: {
    type: String,
  },
  upload: {
    type: String,
  },
  likes: {
    type: Array,
  },
});

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
  profile: {
    type: UserProfile,
    required: false,
    default: undefined,
  },
});

module.exports = mongoose.model(
  `user`,
  UserForm,
  console.log(`user model loaded`)
);
