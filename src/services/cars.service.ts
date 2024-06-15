import { carsRepository } from "../repositories/cars.repository";
import { CarsModel } from "../models/cars.model";

class CarsService {
  async getAllCars() {
    return await carsRepository.getAllCars();
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
    return await carsRepository.updateCar(id, car);
  }

  async softDeleteCar(id: string, deletedBy: string) {
    return await carsRepository.softDeleteCar(id, deletedBy);
  }

  async deleteCarPermanently(id: string) {
    return await carsRepository.deleteCarPermanently(id);
  }
}

export const carsService = new CarsService();
