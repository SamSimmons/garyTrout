exports.up = function(knex, Promise) {

  console.log('create table')

  return knex.schema.createTableIfNotExists('fish', function(table) {
      table.increments('id')
      table.string('x')
      table.string('y')
      table.string('angler')
      table.string('dateCaught')
      table.string('timeCaught')
      table.string('lure')
      table.string('comment')
      table.timestamps()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('fish').then(function () {
    console.log('fish table was dropped')
  })
};