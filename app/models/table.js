"use strict";

const bookshelf = require("../db/bookshelf");
var cascadeDelete = require("bookshelf-cascade-delete"); 

bookshelf.plugin(cascadeDelete);


const Table = bookshelf.Model.extend({
	tableName: "tables",
	initialize: function() {
	},
	hasTimestamps: true,
	hands: function() {
		return this.hasMany("hands");
	},
	session: function() {
		return this.belongsTo("sessions");
	},
	tables_tags: function() {
		return this.hasMany("tables_tags");
	}
}, {
	dependents: ["hands",  "tables_tags"] 
});

module.exports = bookshelf.model("tables", Table);