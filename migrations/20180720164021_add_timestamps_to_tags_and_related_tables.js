
exports.up = function(knex, Promise) {
  return Promise.all([ 
    knex.schema.alterTable('tags', (tbl) => {
      tbl.timestamps();
    }).alterTable('hands_tags', function(tbl) {
      tbl.timestamps();
    }).alterTable('sessions_tags', function(tbl) {
      tbl.timestamps();
    }).alterTable('tables_tags', function(tbl) {
      tbl.timestamps();
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
