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
  const user = new User(req.body);
  User.findOneAndUpdate({
    _id: user._id
  }, user, {
    upsert: true,
    new: true,
  }, function (err, usr) {
    if (err) next(err);

    res.json(usr);
  });

})

router.delete('/:id', function (req, res, next) {
	User.remove({_id: req.params.id },function(err, removed){
		if(err){ next(err); }
		res.json(removed);
	})
});

module.exports = router;
