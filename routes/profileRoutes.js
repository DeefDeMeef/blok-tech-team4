const express = require(`express`);
// eslint-disable-next-line new-cap
const router = express.Router();
const profileController = require(`../controllers/profileController`);
const upload = require(`../controllers/util/upload`);
//const auth = require(`../controllers/authentication`);
const session = require(`express-session`);
const flash = require(`express-flash`);

//flash
//const magIk = (req, res, next) => {
 //if (req.isAuthenticated()) {
 // return next();
//}
  //req.flash(`error`);
 // res.redirect(`/login`);
//};

router
  .get(`/profile/create`, profileController.getCreateProfile)
  .get(`/profile/:profileId`, profileController.getProfile)
  .get(`/edit/:profileId`, profileController.editProfile);

router.post(
  `profile/create`,
  upload.single(`upload`),
  profileController.postCreateProfile
);

router.post(
  `/profile/:profileId`,
  upload.single(),
  profileController.updateProfile
);

module.exports = router;