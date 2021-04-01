const User = require(`../models/user`);
const deleteImg = require(`../controllers/util/deleteImg`);
const mongoose = require(`mongoose`);

/* TOEGEVOEGD 
const deletedUser = require('../models/userProfile');
*/

// get_createProfile, post_createProfile, get_profile

exports.getCreateProfile = (req, res) => {
  console.log(req.session);
  res.render(`createProfile`);
};

exports.postCreateProfile = async (req, res) => {
  const profileData = {
    name: req.body.name,
    sex: req.body.sex,
    sport: req.body.sport,
    bio: req.body.bio,
    upload: req.file && req.file.filename,
  };

  await User.updateOne({ email: req.session.userEmail }, { profile: profileData });

  res.redirect(`/profile/${req.user._id}`);
};

exports.getProfile = async (req, res) => {
  const loggedUser = await User.findOne({ email: req.session.userEmail });

  res.render(`profile`, {
    profile: loggedUser.profile, liked: loggedUser.profile.likes}
  );
};


exports.editProfile = async (req, res) => {
  const UserProfile = await User.findOne({ email: req.session.userEmail });
 

  res.render(`editProfile`, {
    profile: UserProfile.profile,
  });
};

exports.updateProfile = async (req, res) => {
  const user = await User.findOne({ email: req.session.userEmail });

  if (req.file == undefined) {
    console.log(`geen upload`);
  } else {
    console.log(`geüpload`);
    deleteImg(user.upload);
  }

  const update = {
    name: req.body.name,
    sex: req.body.sex,
    sport: req.body.sport,
    bio: req.body.bio,
    upload: req.file ? req.file.filename : user.profile.upload,
  };
  
  await User.updateOne({ email: req.session.userEmail }, { profile: update });

  res.redirect(`/profile/${user._id}`);
};


//toegevoegd
exports.deleteProfile = async (req, res) => {
  console.log('deleted')
  if (req.user_id === "") {
    console.log("user deleted");
  }
  await User.findByIdAndDelete(req.user._id)
  res.redirect('/login');
}

/*
 exports.deleteProfile = async (req, res,) => {
  const findUser = await User.findById(req.params.profileId);
  const deletedUser = await User.deleteOne({ _id: findUser._id }).then(() => {
    console.log("deleted profile");
  });
  res.redirect("/login");



  router.delete(
    '/login',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
      const { id } = req.user;
      try {
        await Profile.findOneAndDelete({ user: id });
        await User.findOneAndDelete({ _id: id });
        res.json({ message: "Success" });
      } catch(e) {
         res.sendStatus(500)
      }
    }
  );
*/
  
