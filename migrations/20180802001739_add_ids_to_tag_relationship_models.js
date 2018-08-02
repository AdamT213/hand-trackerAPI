
exports.up = function(knex, Promise) {
  return Promise.all([ 
    knex.schema.alterTable('hands_tags', (tbl) => {
      tbl.increments('id').primary();
    }).alterTable('sessions_tags', function(tbl) {
      tbl.increments('id').primary();
    }).alterTable('tables_tags', function(tbl) {
      tbl.increments('id').primary();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable('hands_tags')
    .dropTable('sessions_tags')
    .dropTable('tables_tags')
};
