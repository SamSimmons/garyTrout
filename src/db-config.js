var config = {  
  database: {
    dialect:  'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    },
    useNullAsDefault: true
  },

  // the directory your migration files are located in
  directory: __dirname + '/migrations',

  // this table will be populated with some information about your
  // migration files.  it will be automatically created, if it
  // doesn't already exist.
  tableName: 'migrations'
}

var Knex = require('knex')
var knex = Knex(config.database)

module.exports = {
  knex: knex,
  config: config
}
