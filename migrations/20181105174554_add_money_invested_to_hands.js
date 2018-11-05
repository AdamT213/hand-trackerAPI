
exports.up = function(knex, Promise) {
  return Promise.all([ 
    knex.schema.alterTable('hands', (tbl) => {
      tbl.float('money_invested');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable('hands');
};
