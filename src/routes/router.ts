import { Router } from "express";
import authRoutes from "./auth.routes";
import carsRoutes from "./cars.routes";
import path from 'path';
import express from "express";


const router = Router();

const uploadsDir = path.join(__dirname, '../uploads');


router.use("/api/v1", authRoutes);
router.use("/api/v1", carsRoutes);
router.use('/uploads', express.static(uploadsDir));


export default router;
