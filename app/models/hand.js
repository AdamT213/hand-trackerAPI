"use strict";

const bookshelf = require('../db/bookshelf');


const Hand = bookshelf.Model.extend({
  tableName: 'hands',
  initialize: function() {
  },
  hasTimestamps: true,
  session: function() {
    return this.belongsTo('Session');
  },
  table: function() {
    return this.belongsTo('Table');
  },
  tags: function() {
    return this.morphMany('Tag', 'hands_tags');
  }
});

module.exports = bookshelf.model('Hand', Hand);