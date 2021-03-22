const Profile = require(`../models/userProfile`);

// get_createProfile, post_createProfile, get_profile

exports.getCreateProfile = (req, res) => {
  res.render(`createProfile`);
};

exports.postCreateProfile = async (req, res) => {
  try {
    console.log(req.body);
    const newProfile = new Profile(req.body);
    newProfile.save().then((profile) => {
      console.log(profile);
      res.redirect(`/profile/${profile._id}`);
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getProfile = async (req, res) => {
  const findUser = await Profile.findById(req.params.profileId).then(
    (result) => result
  );
  res.render(`profile`, {
    profile: findUser,
  });
};
