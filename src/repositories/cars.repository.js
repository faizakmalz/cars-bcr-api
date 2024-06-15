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
exports.carsRepository = void 0;
const cars_model_1 = require("../models/cars.model");
class CarsRepository {
    getAllCars() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield cars_model_1.CarsModel.query();
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    getAvailableCars() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield cars_model_1.CarsModel.query().whereNull("deletedAt").andWhere("available", true);
        });
    }
    getCarById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield cars_model_1.CarsModel.query().findById(id).whereNull("deletedAt");
        });
    }
    createCar(car) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield cars_model_1.CarsModel.query().insert(car);
        });
    }
    updateCar(id, car) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield cars_model_1.CarsModel.query().patchAndFetchById(id, car).whereNull("deletedAt");
        });
    }
    softDeleteCar(id, deletedBy) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield cars_model_1.CarsModel.query().patchAndFetchById(id, {
                deletedAt: new Date().toISOString(),
                deletedBy,
            });
        });
    }
    deleteCarPermanently(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield cars_model_1.CarsModel.query().deleteById(id);
        });
    }
}
exports.carsRepository = new CarsRepository();
