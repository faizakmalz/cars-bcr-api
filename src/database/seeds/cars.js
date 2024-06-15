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
exports.seed = void 0;
const uuid_1 = require("uuid");
function seed(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex("cars").del();
        // Inserts seed entries
        yield knex("cars").insert([
            {
                id: (0, uuid_1.v4)(),
                plate: "L 223 LH",
                manufacture: "Toyota",
                model: "Altis",
                image: "path/to/image1.jpg",
                rentPerDay: 300000,
                capacity: 5,
                description: "A comfortable midsize sedan.",
                transmission: "Automatic",
                available: true,
                type: "Sedan",
                year: "2020",
                options: ["Air Conditioning", "GPS", "Bluetooth"],
                specs: ["240 hp", "2.5L Engine"],
                createdBy: (0, uuid_1.v4)(),
                updatedBy: (0, uuid_1.v4)(),
                createdAt: knex.fn.now(),
                updatedAt: knex.fn.now(),
                deletedBy: (0, uuid_1.v4)(),
                deletedAt: knex.fn.now(),
            },
            {
                id: (0, uuid_1.v4)(),
                plate: "D 503 CAN",
                manufacture: "Honda",
                model: "HRV",
                image: "path/to/image2.jpg",
                rentPerDay: 400000,
                capacity: 4,
                description: "A reliable and fuel-efficient compact car.",
                transmission: "Manual",
                available: true,
                type: "Compact",
                year: "2019",
                options: ["Air Conditioning", "Bluetooth"],
                specs: ["158 hp", "1.5L Engine"],
                createdBy: (0, uuid_1.v4)(),
                updatedBy: (0, uuid_1.v4)(),
                createdAt: knex.fn.now(),
                updatedAt: knex.fn.now(),
                deletedBy: (0, uuid_1.v4)(),
                deletedAt: knex.fn.now()
            },
            {
                id: (0, uuid_1.v4)(),
                plate: "AG 404 RH",
                manufacture: "Jeep",
                model: "Powder",
                image: "path/to/image3.jpg",
                rentPerDay: 1000000,
                capacity: 4,
                description: "A classic muscle car.",
                transmission: "Automatic",
                available: false,
                type: "Sport",
                year: "2021",
                options: ["Air Conditioning", "GPS", "Bluetooth", "Leather Seats"],
                specs: ["450 hp", "5.0L V8 Engine"],
                createdBy: (0, uuid_1.v4)(),
                updatedBy: (0, uuid_1.v4)(),
                createdAt: knex.fn.now(),
                updatedAt: knex.fn.now(),
                deletedBy: (0, uuid_1.v4)(),
                deletedAt: knex.fn.now(),
            },
        ]);
    });
}
exports.seed = seed;
