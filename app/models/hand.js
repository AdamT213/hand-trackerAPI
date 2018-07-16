"use strict";

const bookshelf = require('../db/bookshelf');


const Hand = bookshelf.Model.extend({
  tableName: 'hands',
  initialize: function() {
  },
  hasTimestamps: true,
});

module.exports = bookshelf.model('Hand', Hand);