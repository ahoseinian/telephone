'use strict';

var assetmanager = require('assetmanager'),
  obj = {};

var assets = assetmanager.process({
  assets: require('./assets.json'),
  debug: (process.env.NODE_ENV !== 'production'),
  webroot: 'lib/salar'
});

module.exports = function (req, res, next) {
  assets.main.js = assets.main.js.map(removeWebRoots);
  assets.main.css = assets.main.css.map(removeWebRoots);
  // res.json(assets.main.js);
  function removeWebRoots(f){
    return f.replace('bower_components','').replace('public', 'salar');
  }
  res.locals = { assets: assets };
  next();
};
