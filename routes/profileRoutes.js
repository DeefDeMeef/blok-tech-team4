const express = require(`express`);
const router = express.Router();
const profileController = require(`../controllers/profileController`);
const upload = require(`../controllers/util/upload`);

router.get(`/create`, profileController.getCreateProfile);

router.post(
  `/create`,
  upload.single(`upload`),
  profileController.postCreateProfile
);

router.get(`/profile`, profileController.getProfile);

module.exports = router;
