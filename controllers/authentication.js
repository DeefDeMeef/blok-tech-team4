const magIk = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash(`error`);
  res.redirect(`login`);
};

module.exports = magIk;
