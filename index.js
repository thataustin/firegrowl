'use strict';

var os = require('os');
var Firebase = require('firebase');
var growl = require('growl');
var previousObj = null;

module.exports = function(firebaseUrl, growlOptions) {
  growlOptions = growlOptions || {};

  var fbRef = new Firebase(firebaseUrl);

  growl('Growl started');
  fbRef.on('value', function(snapshot) {
    if (!previousObj) {
      previousObj = snapshot.val();
      growl('initial data loaded: ' + previousObj);
    } else {
      var diffString = getDiffString(previousObj, snapshot.val());
      growl(diffString);
    }
  });
};

var diff = require('deep-diff').diff;

var getDiffString = function (lhs, rhs) {
  var deletedThings = [];
  var updatedThings = [];
  var newThings = [];

  var outputString = '';

  var changes = diff(lhs, rhs);
  for (var change in changes) {
    switch(change.kind) {
      case 'D':
        deletedThings.push(change);
        break;
      case 'A':
        newThings.push(change);
        break;
      default:
        updatedThings.push(change);
        break;
    }

    if(deletedThings.length > 0) {
      outputString += 'The following was deleted' + os.EOL;
      for (change in deletedThings) {
        outputString += ' ' + change.path + ': ' + change.lhs + ' => ' + change.rhs + os.EOL;
      }
    }

    if(updatedThings.length > 0) {
      outputString += 'The following was updated ' + os.EOL;
      for (change in updatedThings) {
        outputString += ' ' + change.path + ': ' + change.lhs + ' => ' + change.rhs + os.EOL;
      }
    }

    if(newThings.length > 0) {
      outputString += 'The following was added' + os.EOL;
      for (change in newThings) {
        outputString += ' ' + change.path + ': ' + change.lhs + ' => ' + change.rhs + os.EOL;
      }
    }

    return outputString;
  }
};
