"use strict";

const bookshelf = require('../db/bookshelf'); 


const Tag = bookshelf.Model.extend({
  tableName: 'tags',
  initialize: function() {
  },
  hasTimestamps: true,
  hands: function() {
    return this.morphMany(Hand, 'hands_tags');
  },
  sessions: function() {
    return this.morphMany(Session, 'sessions_tags');
  }, 
  tables: function() {
    return this.morphMany(Table, 'tables_tags');
  },
});

module.exports = bookshelf.model('tags', Tag);