import { Request, Response } from "express";
import { carsService } from "../services/cars.service";
import { randomUUID } from "crypto";

class CarsController {
  async getAllCars(req: Request, res: Response) {
    try {
      const cars = await carsService.getAllCars();
      res.json(cars);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving cars" });
    }
  }

  async getAvailableCars(req: Request, res: Response) {
    try {
      const cars = await carsService.getAvailableCars();
      res.json(cars);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving available cars" });
    }
  }

  async getCarById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const car = await carsService.getCarById(id);
      if (!car) {
        return res.status(404).json({ message: "Car not found" });
      }
      res.json(car);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving car" });
    }
  }

  async createCar(req: Request, res: Response) {
    try {
      const carData = {
        ...req.body,
        createdBy: randomUUID(),
        updatedBy: randomUUID(),
        deletedBy: randomUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: new Date().toISOString()
      };
      const car = await carsService.createCar(carData);
      res.status(201).json(car);
    } catch (error) {
      res.status(500).json({ message: "Error creating car" });
    }
  }

  async updateCar(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const carData = {
        ...req.body,
        updatedBy: randomUUID(),
        updatedAt: new Date().toISOString(),
      };
      const car = await carsService.updateCar(id, carData);
      if (!car) {
        return res.status(404).json({ message: "Car not found" });
      }
      res.json(car);
    } catch (error) {
      res.status(500).json({ message: "Error updating car" });
    }
  }

  async softDeleteCar(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const car = await carsService.softDeleteCar(id, req.user.id);
      if (!car) {
        return res.status(404).json({ message: "Car not found" });
      }
      res.json({ message: "Car soft deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting car" });
    }
  }

  async deleteCarPermanently(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await carsService.deleteCarPermanently(id);
      res.json({ message: "Car deleted permanently" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting car permanently" });
    }
  }
}

export const carsController = new CarsController();
