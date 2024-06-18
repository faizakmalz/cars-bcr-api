import { carsRepository } from "../repositories/cars.repository";
import { CarsModel } from "../models/cars.model";

class CarsService {
  async getAllCars() {
    return await carsRepository.getAllCars();
  }

  async filterCars(filterCriteria: { capacity?: number; available?: boolean }) {
    return await carsRepository.getFilteredCars(filterCriteria);
  }
  

  async getAvailableCars() {
    return await carsRepository.getAvailableCars();
  }

  async getCarById(id: string) {
    return await carsRepository.getCarById(id);
  }

  async createCar(car: Partial<CarsModel>) {
    return await carsRepository.createCar(car);
  }

  async updateCar(id: string, car: Partial<CarsModel>) {
    try {
      return await carsRepository.updateCar(id, car);
    } catch (error) {
      console.error('Error in service updateCar:', error);
      throw error;
    }
  }

  async softDeleteCar(id: string, deletedBy: string) {
    return await carsRepository.softDeleteCar(id, deletedBy);
  }

  async deleteCarPermanently(id: string) {
    return await carsRepository.deleteCarPermanently(id);
  }
}

export const carsService = new CarsService();
