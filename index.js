const pg = require('./db')

async function run () {
  try {
    const { rows } = await pg.raw('select * from users')
    console.log(rows[0].username)
  } catch (err) {
    console.log({ err: err.message })
  }
}

run()
