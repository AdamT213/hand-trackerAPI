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
});

module.exports = bookshelf.model('Hand', Hand);