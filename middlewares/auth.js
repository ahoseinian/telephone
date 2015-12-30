exports.isLoggedIn = function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.sendStatus(403);
}

exports.isAdmin = function isAdmin(req, res, next) {
  if (req.user.admin) return next();
  res.sendStatus(403);
}
