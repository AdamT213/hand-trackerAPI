
exports.up = function(knex, Promise) {
  return Promise.all([ 
    knex.schema.createTable('tags', (tbl) => {
      tbl.increments('id').primary();
      tbl.string('name');
    }).createTable('hands_tags', function(tbl) {
      tbl.integer('hand_id').references('hands.id');
      tbl.integer('tag_id').references('tags.id');
    }).createTable('sessions_tags', function(tbl) {
      tbl.integer('session_id').references('sessions.id');
      tbl.integer('tag_id').references('tags.id');
    }).createTable('tables_tags', function(tbl) {
      tbl.integer('table_id').references('tables.id');
      tbl.integer('tag_id').references('tags.id');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable('tags')
    .dropTable('hands_tags')
    .dropTable('sessions_tags')
    .dropTable('tables_tags')
};
