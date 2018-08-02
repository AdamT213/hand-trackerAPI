"use strict";

const bookshelf = require('../db/bookshelf');


const Session = bookshelf.Model.extend({
  tableName: 'sessions',
  initialize: function() {
  },
  hasTimestamps: true,
  hands: function() {
    return this.hasMany('hands');
  },
  tables: function() {
    return this.hasMany('tables');
  },
  sessions_tags: function() {
    return this.hasMany('sessions_tags');
  }
});

module.exports = bookshelf.model('sessions', Session);