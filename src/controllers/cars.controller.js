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
    getFilteredCars(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filterCriteria = req.body;
                const filteredCars = yield cars_service_1.carsService.filterCars(filterCriteria);
                return res.status(200).json(filteredCars);
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Internal Server Error' });
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
            var _a;
            try {
                const carData = {
                    model: req.body.model,
                    manufacture: req.body.manufacture,
                    plate: req.body.plate,
                    image: (_a = req.file) === null || _a === void 0 ? void 0 : _a.path, // save the file path
                    rentPerDay: parseInt(req.body.rentPerDay, 10),
                    capacity: parseInt(req.body.capacity, 10),
                    description: req.body.description,
                    transmission: req.body.transmission,
                    type: req.body.type,
                    year: req.body.year,
                    available: true,
                    options: ['Air Conditioning', 'GPS'],
                    specs: ['100hp', '1.5L Engine'],
                    createdBy: (0, crypto_1.randomUUID)(),
                    updatedBy: (0, crypto_1.randomUUID)(),
                    deletedBy: (0, crypto_1.randomUUID)(),
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    deletedAt: new Date().toISOString()
                };
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
            const { model, manufacture, plate, image, rentPerDay, capacity, description, transmission, type, year } = req.body;
            const userId = req.user.id; // Assuming req.user contains the authenticated user's data
            if (!model || !manufacture || !plate || !rentPerDay || !capacity || !description || !transmission || !type || !year) {
                return res.status(400).json({ message: 'All fields are required' });
            }
            const carData = {
                model,
                manufacture,
                plate,
                image: image || '/default/path', // Handle if image is not provided
                rentPerDay: parseInt(rentPerDay, 10),
                capacity: parseInt(capacity, 10),
                description,
                transmission,
                type,
                year,
                available: true,
                options: ['Air Conditioning', 'GPS'], // Make sure this is dynamic if needed
                specs: ['100hp', '1.5L Engine'], // Make sure this is dynamic if needed
                updatedBy: userId, // Use authenticated user's ID
                updatedAt: new Date().toISOString(),
            };
            try {
                const car = yield cars_service_1.carsService.updateCar(id, carData);
                if (!car) {
                    return res.status(404).json({ message: 'Car not found' });
                }
                res.json(car);
            }
            catch (error) {
                console.error('Error updating car:', error);
                res.status(500).json({ message: 'Error updating car' });
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
