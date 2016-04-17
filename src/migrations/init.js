exports.up = function(knex, Promise) {

  console.log('create table')

  return knex.schema.createTableIfNotExists('fish', function(table) {
      table.serial('id')
      table.integer('x')
      table.integer('y')
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