"use strict";

const bookshelf = require('../db/bookshelf'); 


const Tag = bookshelf.Model.extend({
  tableName: 'tags',
  initialize: function() {
  },
  hasTimestamps: true,
  hands: function() {
    return this.morphMany('Hands', 'hand_tag');
  },
  sessions: function() {
    return this.morphMany('Sessions', 'session_tag');
  }, 
  tables: function() {
    return this.morphMany('Tables', 'table_tag');
  },
});

module.exports = bookshelf.model('Hand', Hand);