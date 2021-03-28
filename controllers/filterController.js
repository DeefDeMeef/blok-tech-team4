const User = require(`../models/user`);

  exports.applyFilter = async (req, res) => {
    const findMatch = await User.find( { "profile.sport": {$eq: req.body.sports} });
    console.log(findMatch);
    res.render('filterSports', {matches: findMatch});
  };