"use strict";

const bookshelf = require('../db/bookshelf'); 


const Tag = bookshelf.Model.extend({
  tableName: 'tags',
  initialize: function() {
  },
  hasTimestamps: true,
  hands: function() {
    return this.hasMany('hands_tags');
  },
  sessions: function() {
    return this.hasMany('sessions_tags');
  }, 
  tables: function() {
    return this.hasMany('tables_tags');
  },
});

module.exports = bookshelf.model('tags', Tag);