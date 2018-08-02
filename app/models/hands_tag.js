"use strict";

const bookshelf = require('../db/bookshelf');


const Hands_Tag = bookshelf.Model.extend({
  tableName: 'hands_tags',
  initialize: function() {
  },
  hasTimestamps: true,
  hand: function() {
    return this.belongsTo('hands');
  },
  tag: function() {
    return this.belongsTo('tags');
  },
});

module.exports = bookshelf.model('hands_tags', Hands_Tag);