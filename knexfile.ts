import type { Knex } from "knex";

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "postgresql",
    connection: {
      database: "NEWAPI",
      user: "postgres",
      password: "admin"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./src/database/migrations",

    },

    seeds: {
      directory: "./src/database/seeds",

    }
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "NEWAPI",
      user: "postgres",
      password: "admin"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./src/database/migrations",

    },

    seeds: {
      directory: "./src/database/seeds",

    }
  },

  production: {
    client: "postgresql",
    connection: {
      database: "NEWAPI",
      user: "postgres",
      password: "admin"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./src/database/migrations",

    }
  }

};

export default config;
