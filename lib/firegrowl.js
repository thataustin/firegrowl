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
      growl('initial data loaded');
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
  console.log(changes);
  for (var change in changes) {
    switch(changes[change].kind) {
      case 'D':
        deletedThings.push(changes[change]);
        break;
      case 'A':
        newThings.push(changes[change]);
        break;
      default:
        updatedThings.push(changes[change]);
        break;
    }

    if(deletedThings.length > 0) {
      outputString += 'The following was deleted' + os.EOL;
      for (var deleted_idx in deletedThings) {
        if (!deletedThings.hasOwnProperty(deleted_idx)) continue;
        console.log(deleted_idx);
        outputString += ' ' + deletedThings[deleted_idx].path + ': ' + deletedThings[deleted_idx].lhs + ' => ' + deletedThings[deleted_idx].rhs + os.EOL;
      }
    }

    if(updatedThings.length > 0) {
      outputString += 'The following was updated ' + os.EOL;
      for (var updated_idx in updatedThings) {
        if (!updatedThings.hasOwnProperty(updated_idx)) continue;
        outputString += ' ' + updatedThings[updated_idx].path + ': ' + updatedThings[updated_idx].lhs + ' => ' + updatedThings[updated_idx].rhs + os.EOL;
      }
    }

    if(newThings.length > 0) {
      outputString += 'The following was added' + os.EOL;
      for (var added_idx in newThings) {
        if (!newThings.hasOwnProperty(added_idx)) { continue; }
        outputString += ' ' + newThings[added_idx].path + ': ' + newThings[added_idx].lhs + ' => ' + newThings[added_idx].rhs + os.EOL;
      }
    }

    return outputString;
  }
};
