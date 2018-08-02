"use strict";

const bookshelf = require('../db/bookshelf');


const Session = bookshelf.Model.extend({
  tableName: 'sessions',
  initialize: function() {
  },
  hasTimestamps: true,
  hands: function() {
    return this.hasMany('hand');
  },
  tables: function() {
    return this.hasMany('table');
  },
  tags: function() {
    return this.morphMany('tag', 'sessions_tag');
  }
});

module.exports = bookshelf.model('Session', Session);