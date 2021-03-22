const mongoose = require(`mongoose`);

const userProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  sports: {
    type: Array,
    required: true,
  },
  bio: {
    type: String,
  },
  upload: {
    type: String,
  },
  likes: {
    type: [{ String }],
    default: undefined,
  },
});

module.exports = mongoose.model(
  `profile`,
  userProfileSchema,
  console.log(`profile model loaded`)
);
