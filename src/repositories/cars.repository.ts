import { query } from "express";
import { CarsModel } from "../models/cars.model";

class CarsRepository {
  async getAllCars() {
    try {
      return await CarsModel.query();
    } catch (err) {
      console.log(err);
    }

  }

  async getFilteredCars(filterCriteria: { capacity?: number; available?: boolean }) {
    let query = CarsModel.query();
    if (filterCriteria.available !== undefined) {
      query = query.where("available", filterCriteria.available);
    }
    if (filterCriteria.capacity !== undefined) {
      query = query.andWhere("capacity", filterCriteria.capacity);
    }
    return await query;
  }

  async getAvailableCars() {
    return await CarsModel.query().whereNull("deletedAt").andWhere("available", true);
  }

  async getCarById(id: string) {
    return await CarsModel.query().findById(id);
  }

  async createCar(car: Partial<CarsModel>) {
    return await CarsModel.query().insert(car);
  }

  async updateCar(id: string, car: Partial<CarsModel>) {
    try {
      const updatedCar = await CarsModel.query()
        .patchAndFetchById(id, car)
        ;
      return updatedCar;
    } catch (error) {
      console.error('Error in repository updateCar:', error);
      throw error;
    }
  }

  async softDeleteCar(id: string, deletedBy: string) {
    return await CarsModel.query().patchAndFetchById(id, {
      deletedAt: new Date().toISOString(),
      deletedBy,
    });
  }

  async deleteCarPermanently(id: string) {
    return await CarsModel.query().deleteById(id);
  }
}

export const carsRepository = new CarsRepository();
