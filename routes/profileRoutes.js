const express = require(`express`);
const router = express.Router();
const profileController = require(`../controllers/profileController`);
const upload = require(`../controllers/util/upload`);

router
  .get(`/create`, profileController.getCreateProfile)
  .get(`/profile/:profileId`, profileController.getProfile)
  .get(`/edit/:profileId`, profileController.editProfile);

router.post(
  `/create`,
  upload.single(`upload`),
  profileController.postCreateProfile
);

router.post(
  `/profile/:profileId`,
  upload.single(),
  profileController.updateProfile
);

module.exports = router;
