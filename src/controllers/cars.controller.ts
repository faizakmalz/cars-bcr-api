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

  async getFilteredCars(req: Request, res: Response) {
  try {
    const filterCriteria = req.body;
    const filteredCars = await carsService.filterCars(filterCriteria);
    return res.status(200).json(filteredCars);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
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
      const image = req.file ? `uploads/${req.file.filename}` : 'path'; // Correct path
      const carData = {
        model: req.body.model,
        manufacture: req.body.manufacture,
        plate: req.body.plate,
        image: image, // save the file path
        rentPerDay: parseInt(req.body.rentPerDay, 10),
        capacity: parseInt(req.body.capacity, 10),
        description: req.body.description,
        transmission: req.body.transmission,
        type: req.body.type,
        year: req.body.year,
        available: true,
        options: ['Air Conditioning', 'GPS'],
        specs: ['100hp', '1.5L Engine'],
        createdBy: randomUUID(),
        updatedBy: randomUUID(),
        deletedBy: randomUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: new Date().toISOString(),
      };
      const car = await carsService.createCar(carData);
      res.status(201).json(car);
    } catch (error) {
      res.status(500).json({ message: "Error creating car" });
    }
  }
  

  async updateCar(req: Request, res: Response) {
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
      const car = await carsService.updateCar(id, carData);
      if (!car) {
        return res.status(404).json({ message: 'Car not found' });
      }
      res.json(car);
    } catch (error) {
      console.error('Error updating car:', error);
      res.status(500).json({ message: 'Error updating car' });
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
