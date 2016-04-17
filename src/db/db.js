var knex = require('knex')({
  dialect: 'sqlite3',
  connection: {
    filename: '../dev.sqlite3'
  }
});

var db = function (table) {
  knex.raw('select * from ' + table).then(function (resp) {
    console.log(resp)
  })
}

module.exports = db