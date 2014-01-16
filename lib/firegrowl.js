'use strict';

var os = require('os');
var Firebase = require('firebase');
var growl = require('growl');
var previousObj = null;

module.exports = function(firebaseUrl, growlOpts) {
  if ( !firebaseUrl || !typeof firebaseUrl === 'string' || !firebaseUrl.match(/^http/)) { throw 'Must pass url into firegrowl'; }

  growlOpts = growlOpts || {sticky: true, startMsg: true};

  var fbRef = new Firebase(firebaseUrl);

  if (growlOpts.startMsg) {
    growl('Growl started');
  }
  fbRef.on('value', function(snapshot) {
    if (!previousObj) {
      previousObj = {};
    }
    var diffString = getDiffString(previousObj, snapshot.val());
    growl(diffString, growlOpts);
  });
};

var diff = require('deep-diff').diff;
var tab = module.exports.TAB = '   ';
var eol = module.exports.EOL = os.EOL;
var pathSeparator = '.';

var getDiffString = function (lhs, rhs) {
  var deletedThings = [];
  var updatedThings = [];
  var newThings = [];

  var outputString = '';

  var changes = diff(lhs, rhs);

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
    outputString += 'Deleted the following';
    for (var deletedIdx in deletedThings) {
      var diffDel = deletedThings[deletedIdx];
      outputString += eol + tab + diffDel.path.join(pathSeparator) + 
        ': ' + diffDel.lhs;
    }
  }

  if(updatedThings.length > 0) {
    outputString += 'Updated the following';
    for (var updatedIdx in updatedThings) {
      var diffUpdate = updatedThings[updatedIdx];
      outputString += eol + tab + diffUpdate.path.join(pathSeparator) + ': ' +
        diffUpdate.lhs + ' => ' + diffUpdate.rhs;
    }
  }

  if(newThings.length > 0) {
    outputString += 'Added the following';
    for (var addedIdx in newThings) {
      var diffNew = newThings[addedIdx];
      outputString += eol + tab + diffNew.path.join(pathSeparator) + ' => ' + diffNew.rhs;
    }
  }

  return outputString;
};

module.exports.getDiffString = getDiffString;
