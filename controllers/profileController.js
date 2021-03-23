const Profile = require(`../models/userProfile`);
const User = require(`../models/user`);

// get_createProfile, post_createProfile, get_profile

exports.getCreateProfile = (req, res) => {
  res.render(`createProfile`);
};

exports.postCreateProfile = (req, res) => {
  console.log(req.body, req.file);
  const newProfile = new Profile({
    name: req.body.name,
    sex: req.body.sex,
    sports: req.body.sports,
    bio: req.body.bio,
    upload: req.file.filename,
  });
  newProfile.save().then((profile) => {
    console.log(profile._id);
    res.redirect(`/profile/${profile._id}`);
  });
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
