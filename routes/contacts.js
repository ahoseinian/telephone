var express = require('express');
var router = express.Router();
var Contact = require('../models/contact');

router.get('/search/:query?', function (req, res, next) {
  var qry = req.params.query;
  Contact
    .find({
      $or:[
        { name:         { $regex: '.*'+ qry +'.*' } }, 
        { company:      { $regex: '.*'+ qry +'.*' } }, 
        { 'phones.num': { $regex: '.*'+ qry +'.*' } }, 
        { address:      { $regex: '.*'+ qry +'.*' } }, 
        { email:        { $regex: '.*'+ qry +'.*' } }, 
        { info:         { $regex: '.*'+ qry +'.*' } }, 
        { tavalod:      { $regex: '.*'+ qry +'.*' } }, 
      ]
    }) 
    .limit(40) 
    .exec(function (err, contacts) {
      if (err) next(err);
      res.json(contacts);
    });
});


/* GET contacts listing. */
router.get('/', function(req, res, next) {
	Contact
    .find() 
    .limit(40) 
    .exec(function (err, contacts) {
  		if(err){next(err)};
  		res.json(contacts);
  	});
});


router.post('/', function(req, res, next) {
  var contact = new Contact(req.body);

  contact.save(function(err, contact){
    if(err){ return next(err); }
    res.json(contact);
  });
});

router.delete('/:id', function(req, res, next){
	Contact.remove({_id: req.params.id },function(err, removed){
		if(err){ next(err); }
		res.json(removed);
	})
});

router.put('/:id', function(req, res, next) {
  Contact.update({_id: req.params.id}, req.body, function(err, user){
    if(err){ return next(err); }
    res.json(user);
  });
});

router.post('/:id/tels', function (req, res, next) {
  Contact.findById(req.params.id, function (err, contact) {
    contact.phones.push(req.body);
    contact.save(function (err, contact) {
      res.json(contact);
    });
  });
});

router.delete('/:id/tels/:telId', function (req, res, next) {
  Contact.findById(req.params.id, function (err, contact) {
    contact.phones.id(req.params.telId).remove();
    contact.save(function (err, contact) {
      res.json(contact);
    });
  });
});

module.exports = router;
