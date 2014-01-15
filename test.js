'use strict';
var firegrowl = require('./lib/firegrowl.js');

var fbURL = null; // Set your test url here (best with now read/write rules)

if (!fbURL) { throw 'Must set unregulated FB url to run this test!'; }

firegrowl(fbURL); // this call will begin a connection that only listens

// create our own local connection to make the updates with
var Firebase = require('firebase');

var fb = new Firebase(fbURL);

console.log('should get a growl notification about doctor_name being added first');
setTimeout(function() {
  fb.set({'doctor_name': 'Doctor Who'});
}, 1000);

console.log('should get a growl notification about doctor name being updated second');
setTimeout(function() {
  fb.set({'doctor_name': 'Dr Who'});
}, 2000);
