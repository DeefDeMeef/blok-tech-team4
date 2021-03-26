const Profile = require(`../models/userProfile`);
const User = require(`../models/user`);
const deleteImg = require(`../controllers/util/deleteImg`);
const mongoose = require(`mongoose`);

// get_createProfile, post_createProfile, get_profile

exports.getCreateProfile = (req, res) => {
  console.log(req.session);
  res.render(`createProfile`);
};

exports.postCreateProfile = (req, res) => {
  const newProfile = new Profile({
    name: req.body.name,
    sex: req.body.sex,
    sport: req.body.sport,
    bio: req.body.bio,
    upload: req.file.filename,
  });
  newProfile.save().then((profile) => {
    req.session.profileId = profile._id;
    res.redirect(`/profile/${profile._id}`);
  });
};

exports.getProfile = async (req, res) => {
  console.log(req.session);
  const loggedUser = await User.findOne({ email: req.session.userEmail });
  loggedUser.profileId = req.session.profileId;
  await loggedUser.save();
  console.log(loggedUser);
  const findProfile = await Profile.findById(req.params.profileId);
  res.render(`profile`, {
    profile: findProfile,
  });
};

exports.editProfile = async (req, res) => {
  const findProfile = await Profile.findById(req.params.profileId);
  res.render(`editProfile`, {
    profile: findProfile,
  });
};

exports.updateProfile = async (req, res) => {
  const findUser = await Profile.findById(req.params.profileId);
  console.log(findUser);
  if (req.file == undefined) {
    console.log(`geen upload`);
  } else {
    console.log(`geüpload`);
    deleteImg(findUser.upload);
  }
  const update = {
    name: req.body.name,
    sex: req.body.sex,
    sport: req.body.sport,
    bio: req.body.bio,
    upload: req.file ? req.file.filename : findUser.upload,
  };
  console.log(update);
  await Profile.updateOne({ _id: req.params.profileId }, update);
  res.redirect(`/profile/${req.params.profileId}`);
};
