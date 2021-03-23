const Profile = require(`../models/userProfile`);

  exports.applyFilter = (req, res) => {
    console.log(req.body);
    // const findSports = await Profile.findMany(req.body.sports).then(
    //   (profile) => profile
    // );
    // res.render(`profile`, {
    //   profile: findProfile,
    // });
  };

 