"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cars_controller_1 = require("../controllers/cars.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const uploads_middleware_1 = __importDefault(require("../middlewares/uploads.middleware"));
const router = (0, express_1.Router)();
router.get("/cars", cars_controller_1.carsController.getAllCars.bind(cars_controller_1.carsController));
router.get("/cars/available", auth_middleware_1.authenticate, cars_controller_1.carsController.getAvailableCars.bind(cars_controller_1.carsController));
router.get("/cars/:id", auth_middleware_1.authenticate, cars_controller_1.carsController.getCarById.bind(cars_controller_1.carsController));
router.post("/cars", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(["admin", "superadmin"]), uploads_middleware_1.default.single('image'), cars_controller_1.carsController.createCar.bind(cars_controller_1.carsController));
router.post("/filtered-cars", cars_controller_1.carsController.getFilteredCars.bind(cars_controller_1.carsController));
router.put("/cars/:id", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(["admin", "superadmin"]), cars_controller_1.carsController.updateCar.bind(cars_controller_1.carsController));
router.delete("/cars/:id", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(["admin", "superadmin"]), cars_controller_1.carsController.deleteCarPermanently.bind(cars_controller_1.carsController));
exports.default = router;
