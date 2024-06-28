import { knex } from "knex";
import { Model } from "objection";
import config from "../knexfile";

console.log("Initializing Knex instance");

const knexInstance = knex(config.development);

Model.knex(knexInstance);

async function testDatabaseConnection() {
    try {
      const result = await knexInstance.raw('SELECT 1+1 AS result');
      console.log('Database connection successful:', result.rows[0].result === 2);
    } catch (error) {
      console.error('Database connection failed:', error);
      process.exit(1); // Exit the process if the connection fails
    }
  }

testDatabaseConnection();

console.log("Knex instance initialized and Model bound");

export default knexInstance;