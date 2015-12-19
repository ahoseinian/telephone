var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/', function (req, res, next) {
	User
		.find()
		.exec(function (err, msgs) {
			if (err) next(err);
			
			res.json(msgs);
		})
});

router.post('/', function (req, res, next) {
	var usr = new User(req.body);
	
	usr.save(function (err, usr) {
		if (err) next(err);
		
		res.json(usr);
	});

})

router.put('/:id', function (req, res, next) {
  User.update({messageid: req.params.id}, req.body, function (err, msg){
    if(err){ return next(err); }
    res.json(msg);
  });
})


module.exports = router;