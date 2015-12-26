var express = require('express');
var router = express.Router();

router.use('/auth', require('./auth'));
router.use('/api/contacts', isLoggedIn, require('./contacts'));
router.use('/api/messages', isLoggedIn, require('./messages'));
router.use('/api/users', isLoggedIn, isAdmin, require('./users'));
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    ip: req.ip.replace(/f|:/g, ''),
    user: req.user
  });
});

router.get('/tel', function (req, res, next) {
  res.render('tel', {
    user: req.user
  })
})

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.sendStatus(403);
}

function isAdmin(req, res, next) {
  if (req.user.admin) return next();
  res.sendStatus(403);
}

module.exports = router;
