module.exports = {

  testing: {
    client: 'postgresql',
    connection: {
      database: 'poker_handsdb'
    },
    pool: {
      min:2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  development: {
    client: 'postgresql',
    connection: {
      database: 'poker_handsdb',
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }, 

  production: { 
    client: 'postgresql', 
    connection: 'postgres://tsmbwlixrhxxad:41954cf332bec7b698f0b37c6e8457543d08586ec3a6415c9bae59c7fb219e9a@ec2-174-129-192-200.compute-1.amazonaws.com:5432/d1nnsutdudp4dn',
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};