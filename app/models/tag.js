"use strict";

const bookshelf = require('../db/bookshelf'); 


const Tag = bookshelf.Model.extend({
  tableName: 'tags',
  initialize: function() {
  },
  hasTimestamps: true,
  hands_tags: function() {
    return this.hasMany('hands_tags');
  },
  sessions_tags: function() {
    return this.hasMany('sessions_tags');
  }, 
  tables_tags: function() {
    return this.hasMany('tables_tags');
  },
});

module.exports = bookshelf.model('tags', Tag);