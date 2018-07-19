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
  tags: function() {
    return this.morphMany('Tags', 'session_tag');
  }
});

module.exports = bookshelf.model('Session', Session);