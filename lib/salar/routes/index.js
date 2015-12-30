var router = require('express').Router();
var auth = require('middlewares/auth');

router.use( '/api/customers', auth.isLoggedIn, require('./customers') );
router.use( '/api/products', auth.isLoggedIn, require('./products') );
router.use( '/api/models', auth.isLoggedIn, require('./models') );
router.use( '/api/purchases', auth.isLoggedIn, require('./purchases') );

/* GET home page. */
router.get('/', function(req, res, next) {
	var user = ((req.session.passport || {}).user);
  res.render('index', {user: user, title: 'Salar'});
});

module.exports = router;
