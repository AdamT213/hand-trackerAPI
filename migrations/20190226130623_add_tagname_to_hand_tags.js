
exports.up = function(knex, Promise) {
    return Promise.all([ 
		knex.schema.alterTable("hands_tags", (tbl) => {
			tbl.string("tag_name");
		})
	]);
};

exports.down = function(knex, Promise) {
    return knex.schema
        .dropTable("hands_tags");
};
