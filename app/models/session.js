"use strict";

const bookshelf = require('../db/bookshelf');


const Session = bookshelf.Model.extend({
  tableName: 'sessions',
  initialize: function() {
  },
  hasTimestamps: true,
  hands: function() {
    return this.hasMany(Hand);
  },
  tables: function() {
    return this.hasMany('tables');
  },
  tags: function() {
    return this.morphMany(Tag, 'sessions_tag');
  }
});

module.exports = bookshelf.model('sessions', Session);