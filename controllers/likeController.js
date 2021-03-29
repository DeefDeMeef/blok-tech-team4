const User = require(`../models/user`);

  exports.applyLike = async (req, res) => {

    const findUser = await User.findOne({email: req.session.userEmail});
    if(req.body.action == "like") {
        console.log("like");
        const likeArray = [req.body.email];
        await User.updateOne({ email: req.session.userEmail }, { $push: { "profile.likes": likeArray } });
        res.redirect(`/profile/{findUser._id}`);
    }
    else {
        console.log("dislike");
        await User.findOneAndUpdate({ email: req.session.userEmail }, { $pull: { "profile.likes": { $in: [ req.body.email ] } } });
        res.redirect(`/profile/{findUser._id}`);
    };
};