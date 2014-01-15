'use strict';
module.exports = firebaseGrowl = function(firebaseUrl) {
  var Firebase = require('firebase');
  var growl = require('growl');
  fbRef = Firebase(firebaseUrl);
  fbRef.on('value', function(data) {
    growl('data changed');
  });
};
