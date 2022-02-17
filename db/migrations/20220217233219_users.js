exports.up = function (knex) {
  return knex.schema.alterTable('users', function (table) {
    table.string('username', 35).notNullable().unique()
  })
}

exports.down = function (knex) {
  return knex.dropTable('users')
}
