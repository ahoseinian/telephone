var express = require('express');
var router = express.Router();

router.use('/api/contacts', require('./contacts'));
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Contact Book' });
});

module.exports = router;
