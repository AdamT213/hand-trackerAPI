"use strict";

const bookshelf = require('../db/bookshelf'); 


const Tag = bookshelf.Model.extend({
  tableName: 'tags',
  initialize: function() {
  },
  hasTimestamps: true,
  tag: function() {
    return this.morphTo('tag', 'Hand', 'Session', 'Table');
  },
});

module.exports = bookshelf.model('Hand', Hand);