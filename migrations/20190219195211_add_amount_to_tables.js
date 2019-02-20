
exports.up = function(knex, Promise) {
	return Promise.all([ 
		knex.schema.alterTable("tables", (tbl) => {
			tbl.float("amount").defaultTo(0.0);
		})
	]);
};

exports.down = function(knex, Promise) {
	return knex.schema
		.dropTable("tables");
};
