
exports.up = function(knex, Promise) {
  return Promise.all([ 
    knex.schema.alterTable('hands', (tbl) => {
      tbl.float('moneyInvested');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable('hands');
};
