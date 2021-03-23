const express = require(`express`);
// eslint-disable-next-line new-cap
const router = express.Router();
const profileController = require(`../controllers/profileController`);
const upload = require(`../controllers/util/upload`);

router.get(`/create`, profileController.getCreateProfile);

router.post(
  `/create`,
  upload.single(`upload`),
  profileController.postCreateProfile
);

router.get(`/profile/:profileId`, profileController.getProfile);

module.exports = router;
