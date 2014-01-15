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
      previousObj = {};
    }
    var diffString = getDiffString(previousObj, snapshot.val());
    growl(diffString, {sticky:true});
  });
};

var diff = require('deep-diff').diff;
var tab = '   ';
var eol = os.EOL;

var getDiffString = function (lhs, rhs) {
  var deletedThings = [];
  var updatedThings = [];
  var newThings = [];

  var outputString = '';

  var changes = diff(lhs, rhs);
  console.log('changes:', changes);

  for (var change in changes) {
    switch(changes[change].kind) {
      case 'D':
        deletedThings.push(changes[change]);
        break;
      case 'N':
        newThings.push(changes[change]);
        break;
      default:
        updatedThings.push(changes[change]);
        break;
    }
  }

  if(deletedThings.length > 0) {
    outputString += 'The following was deleted' + eol;
    for (var deletedIdx in deletedThings) {
      var diffDel = deletedThings[deletedIdx];
      console.log(deletedThings);
      outputString += tab + diffDel.path.join('/') + ': ' + diffDel.lhs + ' => ' + diffObj.rhs + eol;
    }
  }

  if(updatedThings.length > 0) {
    outputString += 'The following was updated ' + eol;
    for (var updatedIdx in updatedThings) {
      var diffUpdate = updatedThings[updatedIdx];
      outputString += tab + diffUpdate.path.join('/') + ': ' +
        diffUpdate.lhs + ' => ' + diffUpdate.rhs + eol;
    }
  }

  if(newThings.length > 0) {
    outputString += 'The following was added' + eol;
    for (var addedIdx in newThings) {
      var diffNew = newThings[addedIdx];
      outputString += tab + diffNew.path.join('/') + ' => ' + diffNew.rhs + eol;
    }
  }

  return outputString;
};
