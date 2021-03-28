const express = require(`express`);
const router = express.Router();
const chatController = require('../controllers/chatController')


const magIk = (req, res, next) => {
if (req.isAuthenticated()) {
  return next();
  }
  req.flash(`error`);
  res.redirect(`/login`);
};

router
  .get('/chat/:room/:name', /*magIk, */chatController.chatWindow)


module.exports = router;