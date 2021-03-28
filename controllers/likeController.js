const User = require(`../models/user`);

  exports.applyLike = async (req, res) => {

    const findUser = await User.findOne({email: req.session.userEmail});
  
    if(req.body.action == "like") {
        console.log("like");
        const newLike = req.body.userId;
        await User.updateOne({ email: req.session.userEmail }, {"profile.likes": newLike});
        res.redirect(`/profile/{findUser._id}`);
    }
    else {
        console.log("dislike");
        const newLike = req.body.userId;
        await User.findOneAndUpdate({ email: req.session.userEmail }, { $pull: { "profile.likes": { $in: [ req.body.userId ] } } });
        res.redirect(`/profile/{findUser._id}`);
    };
};
