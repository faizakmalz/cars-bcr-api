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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = require("knex");
const objection_1 = require("objection");
const knexfile_1 = __importDefault(require("../knexfile"));
console.log("Initializing Knex instance");
const knexInstance = (0, knex_1.knex)(knexfile_1.default.development);
objection_1.Model.knex(knexInstance);
function testDatabaseConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield knexInstance.raw('SELECT 1+1 AS result');
            console.log('Database connection successful:', result.rows[0].result === 2);
        }
        catch (error) {
            console.error('Database connection failed:', error);
            process.exit(1); // Exit the process if the connection fails
        }
    });
}
testDatabaseConnection();
console.log("Knex instance initialized and Model bound");
exports.default = knexInstance;
