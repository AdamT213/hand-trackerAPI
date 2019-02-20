"use strict";

const bookshelf = require("../db/bookshelf");
var cascadeDelete = require("bookshelf-cascade-delete"); 

bookshelf.plugin(cascadeDelete);


const Hand = bookshelf.Model.extend({
	tableName: "hands",
	initialize: function() {
	},
	hasTimestamps: true,
	sessions: function() {
		return this.belongsTo("sessions");
	},
	tables: function() {
		return this.belongsTo("tables");
	},
	hands_tags: function() {
		return this.hasMany("hands_tags");
	},
}, {
	dependents: ["hands_tags"] 
});

module.exports = bookshelf.model("hands", Hand);