"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
function up(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex.schema.createTable("cars", (table) => {
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
            table.timestamp("updatedAt").defaultTo(knex.fn.now());
            table.timestamp("deletedAt");
        });
    });
}
exports.up = up;
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex.schema.dropTable("cars");
    });
}
exports.down = down;
