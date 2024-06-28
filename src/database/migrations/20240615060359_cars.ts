import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  const tableExists = await knex.schema.hasTable("cars");

  if (!tableExists) {
    await knex.schema.createTable("cars", (table) => {
      table.uuid("id").primary().defaultTo(knex.fn.uuid());
      table.string("plate").notNullable();
      table.string("manufacture").notNullable();
      table.string("model").notNullable();
      table.string("image").notNullable();
      table.float("rentPerDay").notNullable();
      table.integer("capacity").notNullable();
      table.text("description").notNullable();
      table.string("transmission").notNullable();
      table.boolean("available").notNullable();
      table.string("type").notNullable();
      table.string("year").notNullable();
      table.specificType("options", "text ARRAY").notNullable();
      table.specificType("specs", "text ARRAY").notNullable();
      table.uuid("createdBy").notNullable();
      table.uuid("updatedBy").notNullable();
      table.uuid("deletedBy").notNullable();
      table.timestamp("createdAt").defaultTo(knex.fn.now());
      table.timestamp("updatedAt").defaultTo(knex.fn.now()); // Default to current timestamp
      table.timestamp("deletedAt");
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("cars");
}
