const express = require(`express`);
const router = express.Router();
const mailerController = require(`../controllers/mailerController`);

router.get(`/mail`, (req, res) => {res.render(`sendMail`)});

router.post(`/mail`, mailerController.sendMail);

module.exports = router;