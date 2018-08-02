"use strict";

const bookshelf = require('../db/bookshelf');


const Table = bookshelf.Model.extend({
  tableName: 'table',
  initialize: function() {
  },
  hasTimestamps: true,
  hands: function() {
    return this.hasMany(Hand);
  },
  session: function() {
    return this.belongsTo(Session);
  },
  tags: function() {
    return this.morphMany(Tag, 'tables_tags');
  }
});

module.exports = bookshelf.model('table', Table);