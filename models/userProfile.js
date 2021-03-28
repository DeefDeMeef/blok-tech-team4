const mongoose = require(`mongoose`);

const userProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    require: true,
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
    default: [],
  },
});

module.exports = mongoose.model(
  `profile`,
  userProfileSchema,
  console.log(`profile model loaded`)
);
