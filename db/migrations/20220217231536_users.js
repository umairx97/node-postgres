exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('userId')
  })
}
exports.down = function (knex) {
  return knex.dropTable('users')
}
