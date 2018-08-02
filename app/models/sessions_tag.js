"use strict";

const bookshelf = require('../db/bookshelf');


const Session_Tag = bookshelf.Model.extend({
  tableName: 'sessions_tags',
  initialize: function() {
  },
  hasTimestamps: true,
  session: function() {
    return this.belongsTo('sessions');
  },
  tag: function() {
    return this.belongsTo('tags');
  },
});

module.exports = bookshelf.model('sessions_tags', Session_Tag);