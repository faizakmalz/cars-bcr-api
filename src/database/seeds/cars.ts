import { Knex } from "knex";
import { v4 as uuidv4 } from "uuid";

export async function seed(knex: Knex): Promise<void> {
  await knex("cars").del();

  // Inserts seed entries
  await knex("cars").insert([
    {
      id: uuidv4(),
      plate: "L 223 LH",
      manufacture: "Toyota",
      model: "Altis",
      image: "path/to/image1.jpg",
      rentPerDay: 300000,
      capacity: 5,
      description: "A comfortable midsize sedan.",
      transmission: "Automatic",
      available: true,
      type: "Sedan",
      year: "2020",
      options: ["Air Conditioning", "GPS", "Bluetooth"],
      specs: ["240 hp", "2.5L Engine"],
      createdBy: uuidv4(),
      updatedBy: uuidv4(),
      createdAt: knex.fn.now(),
      updatedAt: knex.fn.now(),
      deletedBy: uuidv4(),
      deletedAt: knex.fn.now(), 

    },
    {
      id: uuidv4(),
      plate: "D 503 CAN",
      manufacture: "Honda",
      model: "HRV",
      image: "path/to/image2.jpg",
      rentPerDay: 400000,
      capacity: 4,
      description: "A reliable and fuel-efficient compact car.",
      transmission: "Manual",
      available: true,
      type: "Compact",
      year: "2019",
      options: ["Air Conditioning", "Bluetooth"],
      specs: ["158 hp", "1.5L Engine"],
      createdBy: uuidv4(), 
      updatedBy: uuidv4(), 
      createdAt: knex.fn.now(),
      updatedAt: knex.fn.now(),
      deletedBy: uuidv4(),
      deletedAt: knex.fn.now()

    },
    {
      id: uuidv4(),
      plate: "AG 404 RH",
      manufacture: "Jeep",
      model: "Powder",
      image: "path/to/image3.jpg",
      rentPerDay: 1000000,
      capacity: 4,
      description: "A classic muscle car.",
      transmission: "Automatic",
      available: false,
      type: "Sport",
      year: "2021",
      options: ["Air Conditioning", "GPS", "Bluetooth", "Leather Seats"],
      specs: ["450 hp", "5.0L V8 Engine"],
      createdBy: uuidv4(), 
      updatedBy: uuidv4(), 
      createdAt: knex.fn.now(),
      updatedAt: knex.fn.now(),
      deletedBy: uuidv4(),
      deletedAt: knex.fn.now(), 
    },
  ]);
}
