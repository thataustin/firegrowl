'use strict';
var firegrowl = require('./lib/firegrowl.js');

var fbURL = null; // Set your test url here (best with now read/write rules)

if (!fbURL) { throw 'Must set Firebase url that has open read access to run this demo!'; }

firegrowl(fbURL, {sticky: true}); // this call will begin a connection that only listens

// create our own local connection to make the updates with
var Firebase = require('firebase');

var fb = new Firebase(fbURL);

console.log('should get a growl notification about doctor name/enemy first');
setTimeout(function() {
  fb.set({'doctor_name': 'Doctor Who', 'doctor_enemy': 'Dalek'});
}, 1000);

console.log('should get a growl notification about doctor_name being updated second');
setTimeout(function() {
  fb.set({'doctor_name': 'Dr Who', 'doctor_enemy': 'Cybermen'});
}, 2000);
