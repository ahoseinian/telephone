var express = require('express');
var router = express.Router();
var Message = require('../models/message');

router.get('/', function (req, res, next) {
	Message
		.find()
		.exec(function (err, msgs) {
			if (err) next(err);
			
			res.json(msgs);
		})
});

router.post('/', function (req, res, next) {
	var msg = new Message(req.body);
	
	msg.save(function (err, msg) {
		if (err) next(err);
		
		res.json(msg);
	});

})

router.put('/:id', function (req, res, next) {
  Message.update({messageid: req.params.id}, req.body, function (err, msg){
    if(err){ return next(err); }
    res.json(msg);
  });
})


module.exports = router;