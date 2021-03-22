const Profile = require(`../models/userProfile`);
const User = require(`../models/user`);

// get_createProfile, post_createProfile, get_profile

exports.getCreateProfile = (req, res) => {
  res.render(`createProfile`);
};

exports.postCreateProfile = (req, res) => {
  try {
    console.log(req.body);
    const newProfile = new Profile(req.body);
    newProfile.save().then((profile) => {
      console.log(profile._id);
      res.redirect(`/profile/${profile._id}`);
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getProfile = async (req, res) => {
  const findProfile = await Profile.findById(req.params.profileId).then(
    (profile) => profile
  );
  res.render(`profile`, {
    profile: findProfile,
  });
};

exports.editProfile;
