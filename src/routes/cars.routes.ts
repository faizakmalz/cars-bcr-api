import { Router } from "express";
import { carsController } from "../controllers/cars.controller";
import { authenticate, authorize } from "../middlewares/auth.middleware";

const router = Router();

router.get("/cars", carsController.getAllCars.bind(carsController));
router.get("/cars/available", authenticate, carsController.getAvailableCars.bind(carsController));
router.get("/cars/:id", authenticate, carsController.getCarById.bind(carsController));

router.post("/cars", authenticate, authorize(["admin", "superadmin"]), carsController.createCar.bind(carsController));
router.post("/filtered-cars", carsController.getFilteredCars.bind(carsController));
router.put("/cars/:id", authenticate, authorize(["admin", "superadmin"]), carsController.updateCar.bind(carsController));
router.delete("/cars/:id", authenticate, authorize(["admin", "superadmin"]), carsController.deleteCarPermanently.bind(carsController));

export default router;  
