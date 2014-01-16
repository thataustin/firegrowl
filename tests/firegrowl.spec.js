'use strict';

var fg = require('../lib/firegrowl.js');
var _ = require('lodash');

// A data provider for jasmine (see https://github.com/jphpsf/jasmine-data-provider for details)
var using = function(name, values, func){
  var count = values.length;
  for (var i = 0; i < count; i++) {
    if (Object.prototype.toString.call(values[i]) !== '[object Array]') {
      // wrap all non-array values in an array for apply call
      values[i] = [values[i]];
    }
    func.apply(this, values[i]);
    jasmine.currentEnv_.currentSpec.description += ' (with ' + name + ' using ' + values[i].join(', ') + ')';
  }
};

describe('firegrowl', function() {
  var simpleValueCases, nestedValueCases, deletedCases, sep = fg.EOL + fg.TAB;

  simpleValueCases = {
    msg: 'changes to simple scalar values',
    cases: [
      [{'key': 'old_val'}, {'key': 'new_val'},'Updated the following' + sep + 'key: old_val => new_val'],
      [{'key': null}, {'key': 'new_val'}, 'Updated the following' + sep + 'key: null => new_val'],
      [{'key': 'old_val'}, {'key': null}, 'Updated the following' + sep + 'key: old_val => null'],
    ]
  };

      // Nested value changes
  nestedValueCases = {
    msg: 'changes to nested values',
    cases: [
      [{'outer': {'inner': 'old_val'}}, {'outer': {'inner': 'new_val'}},'Updated the following' + sep + 'outer.inner: old_val => new_val'],
      [{'outer': {'inner': null}}, {'outer': {'inner': 'new_val'}}, 'Updated the following' + sep + 'outer.inner: null => new_val'],
      [{'outer': {'inner': 'old_val'}}, {'outer': {'inner': null}}, 'Updated the following' + sep + 'outer.inner: old_val => null'],
    ]
  };

  //DELETES
  deletedCases = {
    msg: 'deleted keys',
    cases: [
      [{'key': 'old_val'}, {},'Deleted the following' + sep + 'key: old_val'],
      [{'outer': {'inner': 'old_val'}}, {'outer': {}}, 'Deleted the following' + sep + 'outer.inner: old_val'],
    ]
  };

  _.forEach([simpleValueCases, nestedValueCases, deletedCases], function(set) {
    using(set.msg, set.cases, function(lhs, rhs, expected, msg) {
      it('gets correct diff string', function() {
        expect(fg.getDiffString(lhs, rhs)).toEqual(expected);
      });
    });
  });
});

