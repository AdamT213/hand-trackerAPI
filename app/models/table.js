"use strict";

const bookshelf = require('../db/bookshelf');


const Table = bookshelf.Model.extend({
  tableName: 'tables',
  initialize: function() {
  },
  hasTimestamps: true,
  hands: function() {
    return this.hasMany('Hands');
  },
  session: function() {
    return this.belongsTo('Session');
  },
});

module.exports = bookshelf.model('Table', Table);