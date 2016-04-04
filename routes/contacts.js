var express = require('express');
var router = express.Router();
var Contact = require('../models/contact');
var moment = require('moment-jalaali');


router.get('/search/letter', function (req, res, next) {
  var query = req.query.q;
  if (query == "#")
    query = "(0|1|2|3|4|5|6|7|8|9)";
  Contact.find({
    name: {
      $regex: "^" + query
    }
  }).exec(function (err, contacts) {
    if (err) next(err);
    res.json(contacts);
  });

});


router.get('/search', function (req, res, next) {
  var qry = req.query;
  Contact
    .find({
      $or: [{
        name: {
          $regex: '.*' + qry.q + '.*'
        }
      }, {
        company: {
          $regex: '.*' + qry.q + '.*'
        }
      }, {
        'phones.num': {
          $regex: '.*' + qry.q + '.*'
        }
      }, {
        address: {
          $regex: '.*' + qry.q + '.*'
        }
      }, {
        email: {
          $regex: '.*' + qry.q + '.*'
        }
      }, {
        info: {
          $regex: '.*' + qry.q + '.*'
        }
      }, {
        tavalod: {
          $regex: '.*' + qry.q + '.*'
        }
      }, ]
    })
    .limit(40)
    .exec(function (err, contacts) {
      if (err) next(err);
      res.json(contacts);
    });
});


/* GET contacts listing. */
router.get('/', function (req, res, next) {
  Contact
    .find()
    .limit(40)
    .exec(function (err, contacts) {
      if (err) {
        next(err)
      };
      res.json(contacts);
    });
});

/* GET contacts which are born today. */
router.get('/tavalod/today', function (req, res, next) {
  Contact
    .find({
      tavalod: moment().format('jYYYY-jMM-jDD')
    })
    .exec(function (err, contacts) {
      if (err) {
        next(err)
      };
      res.json(contacts);
    });
});


router.post('/', function (req, res, next) {
  var contact = new Contact(req.body);

  contact.save(function (err, contact) {
    if (err) {
      return next(err);
    }
    res.json(contact);
  });
});

router.delete('/:id', function (req, res, next) {
  Contact.remove({
    _id: req.params.id
  }, function (err, removed) {
    if (err) {
      next(err);
    }
    res.json(removed);
  })
});

router.put('/:id', function (req, res, next) {
  Contact.update({
    _id: req.params.id
  }, req.body, function (err, user) {
    if (err) {
      return next(err);
    }
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
