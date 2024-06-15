import { Router } from "express";
import authRoutes from "./auth.routes";
import carsRoutes from "./cars.routes";

const router = Router();

router.use("/api/v1", authRoutes);
router.use("/api/v1", carsRoutes);

export default router;
