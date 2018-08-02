"use strict";

const bookshelf = require('../db/bookshelf');


const Hand = bookshelf.Model.extend({
  tableName: 'hands',
  initialize: function() {
  },
  hasTimestamps: true,
  session: function() {
    return this.belongsTo('sessions');
  },
  table: function() {
    return this.belongsTo('tables');
  },
  tags: function() {
    return this.morphMany('tags', 'hands_tags');
  }
});

module.exports = bookshelf.model('hands', Hand);