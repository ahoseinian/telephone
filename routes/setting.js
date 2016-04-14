'use strict';
var express = require('express');
var router = express.Router();
var Group = require('../models/group');

router.get('/', function(req, res, next) {
  Group
    .find()
    .exec(function(err, msgs) {
      if (err) return next(err);

      res.json(msgs);
    })
});

router.post('/', function(req, res, next) {
  var msg = new Group(req.body);

  msg.save(function(err, msg) {
    if (err) next(err);

    res.json(msg);
  });

})

router.delete('/:id', function(req, res, next) {
  Group.remove({ _id: req.params.id }, function(err, removed) {
    if (err) return next(err);
    res.json(removed);
  })
});


module.exports = router;
