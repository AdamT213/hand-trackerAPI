
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('hands', (tbl) => {
      tbl.increments('id').primary();
      tbl.string('position');
      tbl.string('preFlopRaise');
      tbl.string('flopBet');
      tbl.string('turnBet');
      tbl.string('riverBet'); 
      tbl.integer('playersToFlop'); 
      tbl.integer('playersToTurn');
      tbl.integer('playersToRiver');
      tbl.integer('playersToShowdown'); 
      tbl.boolean('status');
      tbl.float('potSize');
      tbl.string('holeCards');
      tbl.string('flop');
      tbl.string('turn');
      tbl.string('river');
      tbl.integer('session_id').references('sessions.id');
      tbl.integer('table_id').references('tables.id');
      tbl.timestamps();
    }),
    knex.schema.createTableIfNotExists('sessions', (tbl) => {
      tbl.increments('id').primary();
      tbl.integer('duration');
      tbl.boolean('status');
      tbl.float('amount');
      tbl.timestamps();
    }),
    knex.schema.createTableIfNotExists('tables', (tbl) => {
      tbl.increments('id').primary();
      tbl.integer('buyin');
      tbl.integer('capacity');
      tbl.integer('size');
      tbl.integer('session_id').references('sessions.id');
      tbl.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable('hands')
    .dropTable('sessions')
    .dropTable('tables');
};
