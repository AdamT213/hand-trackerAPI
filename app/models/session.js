"use strict";

const bookshelf = require('../db/bookshelf');


const Session = bookshelf.Model.extend({
  tableName: 'sessions',
  initialize: function() {
  },
  hasTimestamps: true,
  hands: function() {
    return this.hasMany('Hands');
  },
  tables: function() {
    return this.hasMany('Tables');
  },
});

module.exports = bookshelf.model('Session', Session);