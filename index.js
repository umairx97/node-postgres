const pg = require('./db')

// const knex = require('knex')({
//   client: 'pg',
//   connection: {
//     host: '127.0.0.1',
//     port: process.env.DB_PORT || 5432,
//     user: 'postgres',
//     database: 'node-postgres'
//   },
//   migrations: {
//     directory: './migrations',
//     tableName: 'migrations_node_postgres'
//   }
// })

async function run () {
  try {
    const { rows } = await pg.raw('select * from users')
    console.log(rows)
  } catch (err) {
    console.log({ err: err.message })
  }
}

run()
