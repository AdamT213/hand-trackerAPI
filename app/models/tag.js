"use strict";

const bookshelf = require('../db/bookshelf'); 


const Tag = bookshelf.Model.extend({
  tableName: 'tags',
  initialize: function() {
  },
  hasTimestamps: true,
  hands: function() {
    return this.morphMany('Hands', 'hands_tags');
  },
  sessions: function() {
    return this.morphMany('Sessions', 'sessions_tags');
  }, 
  tables: function() {
    return this.morphMany('Tables', 'tables_tags');
  },
});

module.exports = bookshelf.model('Tag', Tag);