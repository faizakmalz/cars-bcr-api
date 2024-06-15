import { CarsModel } from "../models/cars.model";

class CarsRepository {
  async getAllCars() {
    try {
      return await CarsModel.query();
    } catch (err) {
      console.log(err);
    }

  }

  async getAvailableCars() {
    return await CarsModel.query().whereNull("deletedAt").andWhere("available", true);
  }

  async getCarById(id: string) {
    return await CarsModel.query().findById(id).whereNull("deletedAt");
  }

  async createCar(car: Partial<CarsModel>) {
    return await CarsModel.query().insert(car);
  }

  async updateCar(id: string, car: Partial<CarsModel>) {
    return await CarsModel.query().patchAndFetchById(id, car).whereNull("deletedAt");
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
