import { Knex } from "knex";
import * as bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

export async function seed(knex: Knex): Promise<void> {
  await knex("users").del();

  await knex("users").insert([
    { id: uuidv4(), name: "SuperAdmin", email: "superadmin@binar.com", password: await bcrypt.hash("superadmin", 10), role: "superadmin", createdAt: knex.fn.now(), updatedAt: knex.fn.now() },

    { id: uuidv4(), name: "Admin", email: "admin@binar.com", password: await bcrypt.hash("admin", 10), role: "admin", createdAt: knex.fn.now(), updatedAt: knex.fn.now() },

    { id: uuidv4(), name: "CustomerA", email: "customera@binar.com", password: await bcrypt.hash("customera", 10), role: "customer", createdAt: knex.fn.now(), updatedAt: knex.fn.now() },
    { id: uuidv4(), name: "CustomerB", email: "customerb@binar.com", password: await bcrypt.hash("customerb", 10), role: "customer", createdAt: knex.fn.now(), updatedAt: knex.fn.now() },

  ]);
}
