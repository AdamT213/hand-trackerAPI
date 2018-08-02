"use strict";

const bookshelf = require('../db/bookshelf');


const Session = bookshelf.Model.extend({
  tableName: 'session',
  initialize: function() {
  },
  hasTimestamps: true,
  hands: function() {
    return this.hasMany(Hand);
  },
  tables: function() {
    return this.hasMany(Table);
  },
  tags: function() {
    return this.morphMany(Tag, 'sessions_tag');
  }
});

module.exports = bookshelf.model('session', Session);