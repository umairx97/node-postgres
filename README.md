# Migrations & Seeding

## What are migrations??

Migrations are a way to make database changes or updates, like creating or dropping tables, as well as updating a table with new columns with constraints via generated scripts. We can build these scripts via the command line using `knex` command line tool.

To learn more about migrations, check out [this](https://www.openscg.com/2017/08/what-is-a-database-migration/) article on the different types of database migrations!

### Creating/Dropping Tables

Let's create a `Users` table using the `knex` command line tool. In the root of our project run the following commands:

```bash
$ knex seed:make users --knexfile=./db/knexfile.js
```

The above commands will generate migration scripts in `./db/migrations` with the given name plus a timestamp. (i.e. 20171024191043_user.js). This is on purpose so that knex can run the older migration files first, and then the newer ones that build on top of them.

The content of these files will stub out empty `up` and `down` functions to create or drop tables or columns.

We now want to build out the `users` table using some of the built in knex methods.

**Example `20171024191043_create_user.js`**

```javascript
exports.up = function (knex) {
  /* Make sure to return the instance promise */ 
  return knex.schema.createTable("users", function (table) {
    table.increments();
    table.string("email").notNullable();
    table.string("password").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};
```
Now we can run the below command performing a migration and updating our local database:

```bash
$ knex migrate:latest --knexfile=./db
```

### Adding/Dropping Columns

Now, let's say that we want to add a column to either our `Users` or `Tasks` tables. Similar to creating a table, we can do this by creating another migration file that will be specifically for adding or removing a column from the desired table.

First lets create that migration script through `knex.js`

```bash
$ knex seed:make users --knexfile=./db/knexfile.js
```

Inside of our newly created migration script, we can now edit the `exports.up` and `exports.down` functions to look like this.

```javascript
exports.up = function (knex) {
  return knex.schema.alterTable('users', function (table) {
    table.string('username', 35).notNullable().unique()
  })
}

exports.down = function (knex) {
  return knex.dropTable('users')
}

```

Now we can run the `knex:migrate` command to update our existing table.

```bash
$ knex migrate:latest --knexfile=./db/knexfile.js
```

And voila! We should now have a new column named `fullname` in our `Users` table.

### Seeding Your Database

Similar to migrations, the `knex` module allows us to create scripts to insert initial data into our tables called seed files! If we have relations on our tables, the seeding **must be in a specific order** to so that we can rely on data that might already be in the database. For example, we must seed the users table first because our tasks table must validate a user id foreign key that already exists.

Lets create some seed files in this order:

```bash
$ knex seed:make users --knexfile=./db/knexfile.js
```

Now lets insert some data into our seed scripts:

**Example users.js**

```javascript
exports.seed = async function (knex) {
  return knex('users').insert([
    { username: 'test-user1' },
    { username: 'test-user2' },
    { username: 'test-user3' }
  ])
}
```

Now we can run the below command in the root of our project to seed our database!

```bash
$ knex seed:run --knexfile=./db/knexfile.js
```

After running this command you should see some test records in your database which you can use either for writing unit tests or in development.