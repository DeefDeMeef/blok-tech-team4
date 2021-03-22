const Profile = require(`../models/userProfile`);

// get_createProfile, post_createProfile, get_profile

exports.getCreateProfile = (req, res) => {
  res.render(`createProfile`);
};

exports.postCreateProfile = async (req, res) => {
  try {
    console.log(req.body);
    const newProfile = new Profile(req.body);
    await newProfile.save();
    res.redirect(`/profile`);
  } catch (err) {
    console.log(err);
  }
};

exports.getProfile = (req, res) => {
  res.render(`profile`);
};
