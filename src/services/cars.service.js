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
exports.carsService = void 0;
const cars_repository_1 = require("../repositories/cars.repository");
class CarsService {
    getAllCars() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield cars_repository_1.carsRepository.getAllCars();
        });
    }
    getAvailableCars() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield cars_repository_1.carsRepository.getAvailableCars();
        });
    }
    getCarById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield cars_repository_1.carsRepository.getCarById(id);
        });
    }
    createCar(car) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield cars_repository_1.carsRepository.createCar(car);
        });
    }
    updateCar(id, car) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield cars_repository_1.carsRepository.updateCar(id, car);
        });
    }
    softDeleteCar(id, deletedBy) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield cars_repository_1.carsRepository.softDeleteCar(id, deletedBy);
        });
    }
    deleteCarPermanently(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield cars_repository_1.carsRepository.deleteCarPermanently(id);
        });
    }
}
exports.carsService = new CarsService();
