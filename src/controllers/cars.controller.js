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
exports.carsController = void 0;
const cars_service_1 = require("../services/cars.service");
const crypto_1 = require("crypto");
class CarsController {
    getAllCars(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cars = yield cars_service_1.carsService.getAllCars();
                res.json(cars);
            }
            catch (error) {
                res.status(500).json({ message: "Error retrieving cars" });
            }
        });
    }
    getAvailableCars(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cars = yield cars_service_1.carsService.getAvailableCars();
                res.json(cars);
            }
            catch (error) {
                res.status(500).json({ message: "Error retrieving available cars" });
            }
        });
    }
    getCarById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const car = yield cars_service_1.carsService.getCarById(id);
                if (!car) {
                    return res.status(404).json({ message: "Car not found" });
                }
                res.json(car);
            }
            catch (error) {
                res.status(500).json({ message: "Error retrieving car" });
            }
        });
    }
    createCar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const carData = Object.assign(Object.assign({}, req.body), { createdBy: (0, crypto_1.randomUUID)(), updatedBy: (0, crypto_1.randomUUID)(), deletedBy: (0, crypto_1.randomUUID)(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), deletedAt: new Date().toISOString() });
                const car = yield cars_service_1.carsService.createCar(carData);
                res.status(201).json(car);
            }
            catch (error) {
                res.status(500).json({ message: "Error creating car" });
            }
        });
    }
    updateCar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const carData = Object.assign(Object.assign({}, req.body), { updatedBy: (0, crypto_1.randomUUID)(), updatedAt: new Date().toISOString() });
                const car = yield cars_service_1.carsService.updateCar(id, carData);
                if (!car) {
                    return res.status(404).json({ message: "Car not found" });
                }
                res.json(car);
            }
            catch (error) {
                res.status(500).json({ message: "Error updating car" });
            }
        });
    }
    softDeleteCar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const car = yield cars_service_1.carsService.softDeleteCar(id, req.user.id);
                if (!car) {
                    return res.status(404).json({ message: "Car not found" });
                }
                res.json({ message: "Car soft deleted successfully" });
            }
            catch (error) {
                res.status(500).json({ message: "Error deleting car" });
            }
        });
    }
    deleteCarPermanently(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield cars_service_1.carsService.deleteCarPermanently(id);
                res.json({ message: "Car deleted permanently" });
            }
            catch (error) {
                res.status(500).json({ message: "Error deleting car permanently" });
            }
        });
    }
}
exports.carsController = new CarsController();
