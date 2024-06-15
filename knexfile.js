"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Update with your config settings.
const config = {
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
exports.default = config;
