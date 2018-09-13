
exports.up = function(knex, Promise) {
  return Promise.all([ 
    knex.schema.alterTable('tables', (tbl) => {
      tbl.boolean('isTermed').defaultTo(false);
    })
  ]);
};


exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable('tables');
};
