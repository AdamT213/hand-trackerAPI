"use strict";

const bookshelf = require('../db/bookshelf');


const Tables_Tag = bookshelf.Model.extend({
  tableName: 'tables_tags',
  initialize: function() {
  },
  hasTimestamps: true,
  table: function() {
    return this.belongsTo('tables');
  },
  tag: function() {
    return this.belongsTo('tags');
  },
});

module.exports = bookshelf.model('tables_tags', Tables_Tag);