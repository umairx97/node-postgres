exports.seed = async function (knex) {
  return knex('users').insert([
    { username: 'test-user1' },
    { username: 'test-user2' },
    { username: 'test-user3' }
  ])
}
