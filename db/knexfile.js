module.exports = {
  production: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      port: process.env.DB_PORT || 5432,
      user: 'postgres',
      database: 'node-postgres'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './migrations',
      tableName: 'migrations_node_postgres'
    }
  },
  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      port: process.env.DB_PORT || 5432,
      user: 'postgres',
      database: 'node-postgres'
    },
    pool: {
      min: 2,
      max: 10
    },
    seeds: {
      directory: './seeds'
    },
    migrations: {
      directory: './migrations',
      tableName: 'migrations_node_postgres'
    }
  }
}
